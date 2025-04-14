/**
 * Parallax effect for floating images in call-to-action section
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize parallax effect
    initParallax();
});

/**
 * Initialize parallax effect for floating content
 */
function initParallax() {
    const floatingItems = document.querySelectorAll('.floating-item');
    if (!floatingItems.length) return;
    
    // Add parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Calculate mouse position as percentage of window
        const mouseXPercent = mouseX / windowWidth;
        const mouseYPercent = mouseY / windowHeight;
        
        floatingItems.forEach((item, index) => {
            // Create different parallax effects for each item
            // Use index to create variation
            const offsetX = (mouseXPercent - 0.5) * (20 + (index % 3) * 5);
            const offsetY = (mouseYPercent - 0.5) * (20 + (index % 4) * 5);
            
            // Apply transform with the original animation intact
            const originalTransform = window.getComputedStyle(item).getPropertyValue('transform');
            
            // Only apply parallax if we're not on a mobile device
            if (window.innerWidth > 768) {
                item.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                
                // Add subtle scale effect based on mouse position
                const scale = 1 + (Math.abs(mouseXPercent - 0.5) + Math.abs(mouseYPercent - 0.5)) * 0.1;
                item.style.transform += ` scale(${scale})`;
            }
        });
    });
    
    // Add subtle pulse effect
    floatingItems.forEach((item, index) => {
        // Delay the pulse effect based on index
        setTimeout(() => {
            addPulseEffect(item, index);
        }, index * 1000);
    });
}

/**
 * Add subtle pulse effect to floating item
 */
function addPulseEffect(item, index) {
    // Create unique animation duration and timing
    const duration = 3 + (index % 3);
    
    // Create keyframes for this specific item
    const pulseAnimation = `
        @keyframes pulse-${index} {
            0% { opacity: ${parseFloat(item.style.opacity)}; }
            50% { opacity: ${Math.min(parseFloat(item.style.opacity) * 1.5, 0.9)}; }
            100% { opacity: ${parseFloat(item.style.opacity)}; }
        }
    `;
    
    // Add keyframes to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = pulseAnimation;
    document.head.appendChild(styleSheet);
    
    // Apply animation to the item
    item.style.animation += `, pulse-${index} ${duration}s ease-in-out infinite`;
    // Stagger start times
    item.style.animationDelay = `${index * 0.7}s`;
}
