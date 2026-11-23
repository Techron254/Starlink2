import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Serve static frontend files if located in parent folder or current folder
app.use(express.static(path.join(__dirname, "..")));
app.use(express.static(__dirname));

const PORT = Number(process.env.PORT || 3000);
const MPESA_ENV = (process.env.MPESA_ENV || "sandbox").trim().toLowerCase();
const BASE_URL =
  MPESA_ENV === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";

const CONSUMER_KEY = (process.env.MPESA_CONSUMER_KEY || "").trim();
const CONSUMER_SECRET = (process.env.MPESA_CONSUMER_SECRET || "").trim();
const HEAD_OFFICE_SHORTCODE = (
  process.env.MPESA_HEAD_OFFICE_SHORTCODE ||
  process.env.MPESA_SHORTCODE ||
  "9652572"
).trim();
const TILL_NUMBER = (
  process.env.MPESA_TILL_NUMBER || "3153265"
).trim();
const PASSKEY = (process.env.MPESA_PASSKEY || "").trim();
const CALLBACK_URL = (process.env.MPESA_CALLBACK_URL || "").trim();

const transactions = new Map();

function normalizeKenyanPhone(input) {
  const digits = String(input || "").replace(/\D/g, "");
  if (digits.startsWith("254") && digits.length === 12) return digits;
  if (digits.startsWith("0") && digits.length === 10) return `254${digits.slice(1)}`;
  if ((digits.startsWith("7") || digits.startsWith("1")) && digits.length === 9) {
    return `254${digits}`;
  }
  return null;
}

function getTimestamp() {
  const now = new Date();
  const eat = new Date(now.getTime() + 3 * 60 * 60 * 1000);
  const yyyy = eat.getUTCFullYear();
  const MM = String(eat.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(eat.getUTCDate()).padStart(2, "0");
  const HH = String(eat.getUTCHours()).padStart(2, "0");
  const mm = String(eat.getUTCMinutes()).padStart(2, "0");
  const ss = String(eat.getUTCSeconds()).padStart(2, "0");
  return `${yyyy}${MM}${dd}${HH}${mm}${ss}`;
}

function getPassword(shortcode, passkey, timestamp) {
  return Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");
}

async function parseJsonSafe(response, label) {
  const raw = await response.text();
  if (!raw) {
    return { ok: false, status: response.status, data: null, raw: "" };
  }
  try {
    return { ok: true, status: response.status, data: JSON.parse(raw), raw };
  } catch {
    console.error(`[${label}] Non-JSON response (HTTP ${response.status}):`, raw);
    return { ok: false, status: response.status, data: null, raw };
  }
}

async function getAccessToken() {
  if (!CONSUMER_KEY || !CONSUMER_SECRET) {
    throw new Error("Missing MPESA_CONSUMER_KEY or MPESA_CONSUMER_SECRET in .env");
  }

  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");
  const res = await fetch(
    `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
  );

  const parsed = await parseJsonSafe(res, "OAuth");
  if (!res.ok || !parsed.ok || !parsed.data?.access_token) {
    throw new Error(
      parsed.data?.errorMessage ||
        `OAuth token failed (HTTP ${res.status}): ${parsed.raw || "empty body"}`
    );
  }

  return parsed.data.access_token;
}

app.post("/api/stk-push", async (req, res) => {
  try {
    const normalizedPhone = normalizeKenyanPhone(req.body?.phone);
    const amount = Math.round(Number(req.body?.amount));
    const plan = String(req.body?.plan || "Starlink Bundle").trim();

    if (!normalizedPhone) {
      return res.status(400).json({
        error: "Enter a valid Kenyan mobile number (07XX, 01XX, or 2547XX).",
      });
    }
    if (!Number.isFinite(amount) || amount < 1) {
      return res.status(400).json({ error: "Invalid bundle amount." });
    }
    if (!CALLBACK_URL || !CALLBACK_URL.startsWith("https://")) {
      return res.status(400).json({
        error: "MPESA_CALLBACK_URL must be a valid https:// URL in .env.",
      });
    }

    const token = await getAccessToken();

    // --- SECOND LAST CODE GOES HERE ---
    const isProduction = MPESA_ENV === "production";
    const transactionType = isProduction
      ? "CustomerBuyGoodsOnline"
      : "CustomerPayBillOnline";
    const businessShortCode = isProduction ? HEAD_OFFICE_SHORTCODE : "174379";
    const partyB = isProduction ? TILL_NUMBER : "174379";

    const timestamp = getTimestamp();
    const password = getPassword(businessShortCode, PASSKEY, timestamp);

    const payload = {
      BusinessShortCode: businessShortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: transactionType,
      Amount: amount,
      PartyA: normalizedPhone,
      PartyB: partyB,
      PhoneNumber: normalizedPhone,
      CallBackURL: CALLBACK_URL,
      AccountReference: plan.slice(0, 12) || "StarlinkKE",
      TransactionDesc: `Starlink ${plan}`.slice(0, 13),
    };
    // -----------------------------------

    const stkRes = await fetch(`${BASE_URL}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const parsed = await parseJsonSafe(stkRes, "STK Push");
    console.log("STK response:", {
      status: stkRes.status,
      data: parsed.data,
      raw: parsed.raw,
    });

    if (!stkRes.ok || !parsed.ok || parsed.data?.ResponseCode !== "0") {
      return res.status(400).json({
        error:
          parsed.data?.errorMessage ||
          parsed.data?.ResponseDescription ||
          `STK Push rejected (HTTP ${stkRes.status})`,
      });
    }

    const checkoutRequestId = parsed.data.CheckoutRequestID;
    transactions.set(checkoutRequestId, {
      status: "PENDING",
      phone: normalizedPhone,
      amount,
      plan,
      checkoutRequestId,
      createdAt: Date.now(),
    });

    return res.json({
      message: parsed.data.CustomerMessage || "STK Push sent. Check your phone.",
      checkoutRequestId,
    });
  } catch (err) {
    console.error("STK route error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});
function parseCallbackMetadata(items = []) {
  const map = {};
  for (const item of items) {
    if (item?.Name) {
      map[item.Name] = item.Value ?? null;
    }
  }
  return {
    amount: map.Amount ?? null,
    mpesaReceiptNumber: map.MpesaReceiptNumber ?? null,
    transactionDate: map.TransactionDate ?? null,
    phoneNumber: map.PhoneNumber ?? null,
  };
}

app.post("/api/mpesa-callback", (req, res) => {
  const stkCallback = req.body?.Body?.stkCallback;
  console.log("M-Pesa Callback received:", JSON.stringify(req.body, null, 2));

  if (stkCallback?.CheckoutRequestID) {
    const existing = transactions.get(stkCallback.CheckoutRequestID) || {};
    const paid = Number(stkCallback.ResultCode) === 0;
    const metadata = paid
      ? parseCallbackMetadata(stkCallback.CallbackMetadata?.Item)
      : null;

    transactions.set(stkCallback.CheckoutRequestID, {
      ...existing,
      status: paid ? "PAID" : "FAILED",
      resultCode: String(stkCallback.ResultCode),
      resultDesc: stkCallback.ResultDesc,
      receipt: metadata,
      updatedAt: Date.now(),
    });
  }

  return res.json({ ResultCode: 0, ResultDesc: "Accepted" });
});

app.get("/api/transaction/:checkoutRequestId", (req, res) => {
  const tx = transactions.get(req.params.checkoutRequestId);
  if (!tx) {
    return res.status(404).json({ error: "Transaction not found" });
  }
  return res.json(tx);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(
    `M-Pesa env: ${MPESA_ENV} (${BASE_URL}) | Shortcode: ${HEAD_OFFICE_SHORTCODE} | Till: ${TILL_NUMBER}`
  );
  console.log(`Callback URL: ${CALLBACK_URL || "NOT SET"}`);
});