 // Create animated stars
        function createStars() {
            const starsContainer = document.getElementById('stars');
            const numStars = 100;

            for (let i = 0; i < numStars; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.width = star.style.height = Math.random() * 3 + 1 + 'px';
                star.style.animationDelay = Math.random() * 2 + 's';
                starsContainer.appendChild(star);
            }
        }
        
        // Animate connected devices counter
        function animateCounter() {
            const counter = document.getElementById('connected-devices');
            const target = 12450;
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current).toLocaleString();
            }, 30);
        }

        // Payment modal functions
        let currentPlan = '';
        let currentPrice = 0;

        function openPaymentModal(plan, price) {
            currentPlan = plan;
            currentPrice = price;
            
            document.getElementById('modalPlan').textContent = plan;
            document.getElementById('modalPrice').textContent = `Ksh ${price}`;
            document.getElementById('paymentAmount').textContent = `Ksh ${price}`;
            document.getElementById('paymentModal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closePaymentModal() {
            document.getElementById('paymentModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        function processPayment() {
            // Simulate payment processing
            alert(`Thank you! Your ${currentPlan} will be activated within 5 minutes. You will receive a confirmation SMS shortly.`);
            closePaymentModal();
        }

        // Close modal when clicking outside
        document.getElementById('paymentModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closePaymentModal();
            }
        });
        
        // Initialize animations
        document.addEventListener('DOMContentLoaded', function() {
            createStars();
            animateCounter();
        });

        // Add some interactive hover effects
        document.querySelectorAll('.plan-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    
         // Create animated stars
        function createStars() {
            const starsContainer = document.getElementById('stars');
            const numStars = 100;

            for (let i = 0; i < numStars; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.width = star.style.height = Math.random() * 3 + 1 + 'px';
                star.style.animationDelay = Math.random() * 2 + 's';
                starsContainer.appendChild(star);
            }
        }

        // Animate connected devices counter
        function animateCounter() {
            const counter = document.getElementById('connected-devices');
            const target = 12450;
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current).toLocaleString();
            }, 30);
        }

        // Payment modal functions
        currentPlan = '';
        currentPrice = 0;
        
        function openPaymentModal(plan, price) {
            currentPlan = plan;
            currentPrice = price;
            
            document.getElementById('modalPlan').textContent = plan;
            document.getElementById('modalPrice').textContent = `Ksh ${price}`;
            document.getElementById('paymentAmount').textContent = `Ksh ${price}`;
            document.getElementById('paymentModal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closePaymentModal() {
            document.getElementById('paymentModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        function processPayment() {
            // Simulate payment processing
            alert(`Thank you! Your ${currentPlan} will be activated within 5 minutes. You will receive a confirmation SMS shortly.`);
            closePaymentModal();
        }

        // Close modal when clicking outside
        document.getElementById('paymentModal').addEventListener('click', function(e) {
            if (e.target === this) {
                            closePaymentModal();
            }
        });
        
        // Initialize animations
        document.addEventListener('DOMContentLoaded', function() {
            createStars();
            animateCounter();
        });

        // Add some interactive hover effects
        document.querySelectorAll('.plan-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

const copyButtons = document.querySelectorAll('.copy');
copyButtons.forEach(button => {
    button.addEventListener('click', function() { 
        const textToCopy = this.previousElementSibling.textContent;
        console.log(textToCopy)
        navigator.clipboard.writeText(textToCopy).then(() => { 
            this.textContent = 'Copied!';
            setTimeout(() => {
                this.textContent = 'Copy';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);    
            this.textContent = 'Error';
            setTimeout(() => {          
                this.textContent = 'Copy';
            }, 2000);
        });
    });
});

function scrollToHowItWorks() {
    const howItWorksSection = document.querySelector('.how-it-works-section');
    howItWorksSection.scrollIntoView({ behavior: 'smooth' });
}
    function scrollToPackages() {
    const plansContainer = document.querySelector('.plans-container');
    if (plansContainer) {
        plansContainer.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}
function createSatellite() {
    const satellite = document.createElement('div');
    satellite.style.width = '24px';
    satellite.style.height = '12px';
    satellite.style.backgroundColor = '#2a2a2a';
    satellite.style.borderRadius = '3px';
    satellite.style.boxShadow = '0 0 15px rgba(255,255,255,0.4), inset 0 1px 2px rgba(255,255,255,0.2)';
    satellite.style.zIndex = '1000';
    satellite.style.position = 'fixed';
    satellite.style.border = '1px solid #444';
    satellite.style.background = 'linear-gradient(45deg, #2a2a2a, #3a3a3a, #2a2a2a)';
    
    // Main body details - add some surface texture
    const bodyDetails = document.createElement('div');
    bodyDetails.style.position = 'absolute';
    bodyDetails.style.width = '100%';
    bodyDetails.style.height = '100%';
    bodyDetails.style.background = 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 3px)';
    bodyDetails.style.borderRadius = '3px';
    
    // Create enhanced solar panels with grid pattern
    const leftPanel = document.createElement('div');
    leftPanel.style.position = 'absolute';
    leftPanel.style.width = '18px';
    leftPanel.style.height = '8px';
    leftPanel.style.backgroundColor = '#0066cc';
    leftPanel.style.left = '-22px';
    leftPanel.style.top = '2px';
    leftPanel.style.border = '1px solid #004499';
    leftPanel.style.borderRadius = '2px';
    leftPanel.style.background = `linear-gradient(45deg, #0066cc 25%, #1a75ff 25%, #1a75ff 50%, #0066cc 50%, #0066cc 75%, #1a75ff 75%, #1a75ff)`;
    leftPanel.style.backgroundSize = '4px 4px';
    leftPanel.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3), inset 0 1px rgba(255,255,255,0.2)';
    
    const rightPanel = document.createElement('div');
    rightPanel.style.position = 'absolute';
    rightPanel.style.width = '18px';
    rightPanel.style.height = '8px';
    rightPanel.style.backgroundColor = '#0066cc';
    rightPanel.style.right = '-22px';
    rightPanel.style.top = '2px';
    rightPanel.style.border = '1px solid #004499';
    rightPanel.style.borderRadius = '2px';
    rightPanel.style.background = `linear-gradient(45deg, #0066cc 25%, #1a75ff 25%, #1a75ff 50%, #0066cc 50%, #0066cc 75%, #1a75ff 75%, #1a75ff)`;
    rightPanel.style.backgroundSize = '4px 4px';
    rightPanel.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3), inset 0 1px rgba(255,255,255,0.2)';
    
    // Solar panel connectors
    const leftConnector = document.createElement('div');
    leftConnector.style.position = 'absolute';
    leftConnector.style.width = '3px';
    leftConnector.style.height = '2px';
    leftConnector.style.backgroundColor = '#666';
    leftConnector.style.left = '-3px';
    leftConnector.style.top = '5px';
    leftConnector.style.borderRadius = '1px';
    
    const rightConnector = document.createElement('div');
    rightConnector.style.position = 'absolute';
    rightConnector.style.width = '3px';
    rightConnector.style.height = '2px';
    rightConnector.style.backgroundColor = '#666';
    rightConnector.style.right = '-3px';
    rightConnector.style.top = '5px';
    rightConnector.style.borderRadius = '1px';
    
    // Main communication dish
    const dish = document.createElement('div');
    dish.style.position = 'absolute';
    dish.style.width = '15px';
    dish.style.height = '8px';
    dish.style.backgroundColor = '#f0f0f0';
    dish.style.borderRadius = '50%';
    dish.style.top = '2px';
    dish.style.left = '8px';
    dish.style.border = '1px solid #ccc';
    dish.style.background = 'radial-gradient(circle at 30% 30%, #fff, #f0f0f0, #ddd)';
    dish.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2), inset 0 1px rgba(255,255,255,0.3)';
    
    // Dish center focus point
    const dishCenter = document.createElement('div');
    dishCenter.style.position = 'absolute';
    dishCenter.style.width = '2px';
    dishCenter.style.height = '2px';
    dishCenter.style.backgroundColor = '#888';
    dishCenter.style.borderRadius = '50%';
    dishCenter.style.top = '3px';
    dishCenter.style.left = '3px';
    dish.appendChild(dishCenter);
    
    // Top-mounted satellite dish positioned above right side
    const topDish = document.createElement('div');
    topDish.style.position = 'absolute';
    topDish.style.width = '5px';
    topDish.style.height = '10px';
    topDish.style.backgroundColor = '#f5f5f5';
    topDish.style.borderRadius = '50%';
    topDish.style.left = '14px';
    topDish.style.top = '-16px';
    topDish.style.border = '1px solid #ccc';
    topDish.style.background = 'radial-gradient(ellipse at 35% 35%, #fff, #f5f5f5, #ddd)';
    topDish.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3), inset 0 1px rgba(255,255,255,0.4)';
    
    // Top dish center receiver
    const topDishCenter = document.createElement('div');
    topDishCenter.style.position = 'absolute';
    topDishCenter.style.width = '12px';
    topDishCenter.style.height = '2px';
    topDishCenter.style.backgroundColor = '#666';
    topDishCenter.style.borderRadius = '50%';
    topDishCenter.style.top = '4px';
    topDishCenter.style.left = '4px';
    topDishCenter.style.boxShadow = '0 0 1px rgba(0,0,0,0.5)';
    topDish.appendChild(topDishCenter);
    
    // Top dish mounting post
    const dishPost = document.createElement('div');
    dishPost.style.position = 'absolute';
    dishPost.style.width = '2px';
    dishPost.style.height = '6px';
    dishPost.style.backgroundColor = '#888';
    dishPost.style.bottom = '-6px';
    dishPost.style.left = '4px';
    dishPost.style.borderRadius = '1px';
    dishPost.style.boxShadow = '0 0 1px rgba(0,0,0,0.3)';
    topDish.appendChild(dishPost);
    
    // Two shorter directional antennas - one pointing up aligned with dish center, one pointing down on left side
    const antennaUp = document.createElement('div');
    antennaUp.style.position = 'absolute';
    antennaUp.style.width = '1px';
    antennaUp.style.height = '6px';
    antennaUp.style.backgroundColor = '#ddd';
    antennaUp.style.top = '-6px';
    antennaUp.style.left = '19px'; // Aligned with center of dish (14px dish left + 5px to center)
    antennaUp.style.boxShadow = '0 0 2px rgba(255,255,255,0.5)';
    
    const antennaDown = document.createElement('div');
    antennaDown.style.position = 'absolute';
    antennaDown.style.width = '1px';
    antennaDown.style.height = '6px';
    antennaDown.style.backgroundColor = '#ddd';
    antennaDown.style.bottom = '-6px';
    antennaDown.style.left = '8px'; // Left side for balance
    antennaDown.style.boxShadow = '0 0 2px rgba(255,255,255,0.5)';
    
    // Antenna tips (small spheres)
    const tipUp = document.createElement('div');
    tipUp.style.position = 'absolute';
    tipUp.style.width = '2px';
    tipUp.style.height = '2px';
    tipUp.style.backgroundColor = '#ff4444';
    tipUp.style.borderRadius = '50%';
    tipUp.style.top = '-1px';
    tipUp.style.left = '-0.5px';
    tipUp.style.boxShadow = '0 0 3px rgba(255,68,68,0.8)';
    antennaUp.appendChild(tipUp);
    
    const tipDown = document.createElement('div');
    tipDown.style.position = 'absolute';
    tipDown.style.width = '2px';
    tipDown.style.height = '2px';
    tipDown.style.backgroundColor = '#44ff44';
    tipDown.style.borderRadius = '50%';
    tipDown.style.bottom = '-1px';
    tipDown.style.left = '-0.5px';
    tipDown.style.boxShadow = '0 0 3px rgba(68,255,68,0.8)';
    antennaDown.appendChild(tipDown);
    
    // Side thruster nozzles
    const thruster1 = document.createElement('div');
    thruster1.style.position = 'absolute';
    thruster1.style.width = '3px';
    thruster1.style.height = '2px';
    thruster1.style.backgroundColor = '#555';
    thruster1.style.right = '-1px';
    thruster1.style.top = '1px';
    thruster1.style.borderRadius = '0 2px 2px 0';
    thruster1.style.border = '1px solid #333';
    
    const thruster2 = document.createElement('div');
    thruster2.style.position = 'absolute';
    thruster2.style.width = '3px';
    thruster2.style.height = '2px';
    thruster2.style.backgroundColor = '#555';
    thruster2.style.right = '-1px';
    thruster2.style.bottom = '1px';
    thruster2.style.borderRadius = '0 2px 2px 0';
    thruster2.style.border = '1px solid #333';
    
    // Status lights
    const statusLight1 = document.createElement('div');
    statusLight1.style.position = 'absolute';
    statusLight1.style.width = '1px';
    statusLight1.style.height = '1px';
    statusLight1.style.backgroundColor = '#00ff00';
    statusLight1.style.left = '2px';
    statusLight1.style.top = '2px';
    statusLight1.style.borderRadius = '50%';
    statusLight1.style.boxShadow = '0 0 2px rgba(0,255,0,0.8)';
    statusLight1.style.animation = 'blink 1.5s infinite';
    
    const statusLight2 = document.createElement('div');
    statusLight2.style.position = 'absolute';
    statusLight2.style.width = '1px';
    statusLight2.style.height = '1px';
    statusLight2.style.backgroundColor = '#0088ff';
    statusLight2.style.left = '2px';
    statusLight2.style.bottom = '2px';
    statusLight2.style.borderRadius = '50%';
    statusLight2.style.boxShadow = '0 0 2px rgba(0,136,255,0.8)';
    statusLight2.style.animation = 'blink 2s infinite 0.5s';
    
    // Add CSS animation for blinking lights
    if (!document.getElementById('satellite-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'satellite-styles';
        styleSheet.textContent = `
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0.3; }
            }
            @keyframes glow {
                0%, 100% { box-shadow: 0 0 5px rgba(255,255,255,0.3); }
                50% { box-shadow: 0 0 15px rgba(255,255,255,0.6); }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // Apply glow animation to main body
    satellite.style.animation = 'glow 3s ease-in-out infinite';
    
    // Assemble the satellite
    satellite.appendChild(bodyDetails);
    satellite.appendChild(leftPanel);
    satellite.appendChild(rightPanel);
    satellite.appendChild(leftConnector);
    satellite.appendChild(rightConnector);
    satellite.appendChild(dish);
    satellite.appendChild(topDish);
    satellite.appendChild(antennaUp);
    satellite.appendChild(antennaDown);
    satellite.appendChild(thruster1);
    satellite.appendChild(thruster2);
    satellite.appendChild(statusLight1);
    satellite.appendChild(statusLight2);
    
    document.body.appendChild(satellite);
    
    let angle = 0;
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;
   
    function animate() {
        angle += 0.01;
       
        // Create oval path using different radiuses for x and y
        const xRadius = window.innerWidth * 0.4;  // 40% of viewport width
        const yRadius = window.innerHeight * 0.4;  // 40% of viewport height
       
        satellite.style.left = centerX + xRadius * Math.cos(angle) + 'px';
        satellite.style.top = centerY + yRadius * Math.sin(angle) + 'px';
        satellite.style.transform = `rotate(${angle * 57.2958}deg)`;
       
        requestAnimationFrame(animate);
    }
    animate();
}

document.addEventListener('DOMContentLoaded', createSatellite);

function scrollToPackages() {
            document.querySelector('.plans-container').scrollIntoView({ 
                behavior: 'smooth' 
            });
}