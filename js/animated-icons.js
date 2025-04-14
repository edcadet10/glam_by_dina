/**
 * Animated Icons Interaction
 * Enhances the SVG icons with additional interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    // Setup animated service icons
    setupServiceIcons();
    
    // Setup animated social media icons
    setupSocialIcons();
});

/**
 * Setup interactive service icons
 */
function setupServiceIcons() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (!serviceCards.length) return;
    
    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon');
        
        if (!icon) return;
        
        // Add mouseover/mouseout interactions to amplify animations
        card.addEventListener('mouseover', () => {
            const svgDoc = icon.querySelector('svg');
            if (!svgDoc) return;
            
            // Find all animation elements and speed them up
            const animations = svgDoc.querySelectorAll('animate, animateTransform, animateMotion');
            animations.forEach(anim => {
                // Store original duration if not already stored
                if (!anim.dataset.originalDur) {
                    anim.dataset.originalDur = anim.getAttribute('dur');
                }
                
                // Speed up animation
                const currentDur = anim.getAttribute('dur');
                if (currentDur.endsWith('s')) {
                    const seconds = parseFloat(currentDur);
                    const newDuration = Math.max(seconds * 0.6, 0.3) + 's';
                    anim.setAttribute('dur', newDuration);
                }
            });
            
            // Add additional effects based on icon type
            if (icon.classList.contains('video-production')) {
                // Flash the record light more intensely
                const recordLight = svgDoc.getElementById('record-light');
                if (recordLight) {
                    recordLight.style.fill = '#FF0000';
                }
            } else if (icon.classList.contains('photography')) {
                // Trigger a camera "flash" effect
                const flash = document.createElement('div');
                flash.className = 'camera-flash';
                flash.style.position = 'absolute';
                flash.style.top = '0';
                flash.style.left = '0';
                flash.style.width = '100%';
                flash.style.height = '100%';
                flash.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                flash.style.opacity = '0';
                flash.style.zIndex = '1';
                flash.style.pointerEvents = 'none';
                
                card.style.position = 'relative';
                card.appendChild(flash);
                
                // Animate flash
                setTimeout(() => {
                    flash.style.transition = 'opacity 50ms ease-in, opacity 500ms ease-out';
                    flash.style.opacity = '1';
                    
                    setTimeout(() => {
                        flash.style.opacity = '0';
                        
                        // Remove after animation completes
                        setTimeout(() => {
                            card.removeChild(flash);
                        }, 500);
                    }, 50);
                }, 10);
            } else if (icon.classList.contains('social-strategy')) {
                // Make network nodes pulsate more
                const nodes = svgDoc.querySelectorAll('circle[id^="node"]');
                nodes.forEach(node => {
                    node.style.filter = 'drop-shadow(0 0 3px rgba(255, 182, 193, 0.8))';
                });
            } else if (icon.classList.contains('brand-collab')) {
                // Enhance the handshake effect
                const handshake = svgDoc.getElementById('handshake');
                if (handshake) {
                    handshake.style.transform = 'scale(1.1)';
                    handshake.style.transition = 'transform 0.3s ease';
                }
                
                // Make stars brighter
                const stars = svgDoc.querySelectorAll('circle[id^="star"]');
                stars.forEach(star => {
                    star.style.fill = '#FFD700';
                    star.style.filter = 'drop-shadow(0 0 3px rgba(255, 215, 0, 0.8))';
                });
            }
        });
        
        // Reset animations on mouseout
        card.addEventListener('mouseout', () => {
            const svgDoc = icon.querySelector('svg');
            if (!svgDoc) return;
            
            // Reset animation speeds
            const animations = svgDoc.querySelectorAll('animate, animateTransform, animateMotion');
            animations.forEach(anim => {
                if (anim.dataset.originalDur) {
                    anim.setAttribute('dur', anim.dataset.originalDur);
                }
            });
            
            // Reset additional effects
            if (icon.classList.contains('video-production')) {
                const recordLight = svgDoc.getElementById('record-light');
                if (recordLight) {
                    recordLight.style.fill = '#FF3333';
                }
            } else if (icon.classList.contains('social-strategy')) {
                const nodes = svgDoc.querySelectorAll('circle[id^="node"]');
                nodes.forEach(node => {
                    node.style.filter = '';
                });
            } else if (icon.classList.contains('brand-collab')) {
                const handshake = svgDoc.getElementById('handshake');
                if (handshake) {
                    handshake.style.transform = '';
                }
                
                const stars = svgDoc.querySelectorAll('circle[id^="star"]');
                stars.forEach(star => {
                    star.style.fill = '#FFC300';
                    star.style.filter = '';
                });
            }
        });
    });
}

/**
 * Setup interactive social media icons
 */
function setupSocialIcons() {
    const metricCards = document.querySelectorAll('.metric-card');
    
    if (!metricCards.length) return;
    
    metricCards.forEach(card => {
        const icon = card.querySelector('.platform-icon');
        
        if (!icon) return;
        
        // Add mouseover effect
        card.addEventListener('mouseover', () => {
            // Add slight wiggle animation to platform icon
            icon.style.animation = 'wiggle 0.5s ease-in-out';
            
            // Remove animation after it completes
            setTimeout(() => {
                icon.style.animation = '';
            }, 500);
        });
    });
    
    // Add wiggle keyframes if not already in document
    if (!document.querySelector('#icon-keyframes')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'icon-keyframes';
        styleEl.textContent = `
            @keyframes wiggle {
                0% { transform: rotate(0deg) scale(1); }
                25% { transform: rotate(-5deg) scale(1.1); }
                50% { transform: rotate(5deg) scale(1.1); }
                75% { transform: rotate(-3deg) scale(1.1); }
                100% { transform: rotate(0deg) scale(1.1); }
            }
        `;
        document.head.appendChild(styleEl);
    }
}
