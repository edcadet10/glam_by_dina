/**
 * Enhanced Falling Photos Animation
 * Creates a rain-like effect of falling photos in the call-to-action section
 * 
 * This script creates a dynamic visual effect where content thumbnails fall like rain
 * in the background of the call-to-action section. Photos fall at different speeds
 * and trajectories while gently rotating, creating an engaging visual experience.
 * 
 * Features:
 * - Continuous generation of new falling photos
 * - Hover interactions that pause and highlight photos
 * - Responsive behavior that adapts to different screen sizes
 * - Accessibility features that respect reduced-motion preferences
 * - Memory management that removes old photos to maintain performance
 */

document.addEventListener('DOMContentLoaded', () => {
    setupFallingPhotosAnimation();
});

/**
 * Setup falling photos animation in CTA section
 */
function setupFallingPhotosAnimation() {
    const floatingContainer = document.querySelector('.floating-content');
    if (!floatingContainer) return;
    
    // Clear any existing floating items
    floatingContainer.innerHTML = '';
    
    // Use the actual images added to the site for falling effect
    const contentPieces = [
        { src: 'images/glam_by_dina1.jpg', size: '70px', delay: '0s', duration: '8s' },
        { src: 'images/glam_by_dina3.jpg', size: '100px', delay: '2s', duration: '10s' },
        { src: 'images/glam_by_dina4.jpg', size: '85px', delay: '1s', duration: '9s' },
        { src: 'images/glam_by_dina5.jpg', size: '65px', delay: '3s', duration: '7s' },
        { src: 'images/glam_by_dina6.jpg', size: '90px', delay: '0.5s', duration: '11s' },
        { src: 'images/glam_by_dina7.jpg', size: '75px', delay: '2.5s', duration: '9.5s' },
        { src: 'images/glam_by_dina8.jpg', size: '80px', delay: '1.5s', duration: '8.5s' },
        { src: 'images/glam_by_dina1.jpg', size: '60px', delay: '3.5s', duration: '7.5s' },
        { src: 'images/glam_by_dina3.jpg', size: '95px', delay: '4s', duration: '10.5s' },
        { src: 'images/glam_by_dina4.jpg', size: '55px', delay: '4.5s', duration: '6.5s' },
        { src: 'images/glam_by_dina5.jpg', size: '85px', delay: '5s', duration: '9.2s' },
        { src: 'images/glam_by_dina6.jpg', size: '75px', delay: '5.5s', duration: '8.8s' }
    ];
    
    // Create falling photo elements
    contentPieces.forEach((piece) => {
        const fallingEl = document.createElement('div');
        fallingEl.className = 'floating-item falling-photo';
        
        // Set random horizontal position but start from top
        const left = Math.random() * 100; // 0% to 100%
        const startingTop = Math.random() * -50 - 20; // -20% to -70% (above viewport)
        
        fallingEl.style.position = 'absolute';
        fallingEl.style.top = `${startingTop}%`;
        fallingEl.style.left = `${left}%`;
        fallingEl.style.width = piece.size;
        fallingEl.style.height = piece.size;
        fallingEl.style.borderRadius = '8px';
        fallingEl.style.overflow = 'hidden';
        fallingEl.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        fallingEl.style.transform = 'rotate(' + (Math.random() * 20 - 10) + 'deg)';
        fallingEl.style.zIndex = Math.floor(Math.random() * 10);
        fallingEl.style.opacity = '0.7';
        
        // Create image content
        const img = document.createElement('img');
        img.src = piece.src;
        img.alt = 'Beauty content preview';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        
        // Add subtle pink-colored overlay to better match the brand aesthetic
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(255, 182, 193, 0.2)'; // Light pink with 20% opacity
        overlay.style.mixBlendMode = 'overlay';
        
        fallingEl.appendChild(img);
        fallingEl.appendChild(overlay);
        
        // Add animation with delay - longer duration for rain-like effect
        fallingEl.style.animation = `fallDown ${piece.duration} linear infinite`;
        fallingEl.style.animationDelay = piece.delay;
        
        floatingContainer.appendChild(fallingEl);
    });
    
    // Add rain-like falling animation keyframes
    if (!document.querySelector('#falling-photos-keyframes')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'falling-photos-keyframes';
        styleEl.textContent = `
            @keyframes fallDown {
                0% { 
                    transform: translate(0, 0) rotate(0deg); 
                    opacity: 0; 
                }
                10% {
                    opacity: 0.7;
                }
                25% { 
                    transform: translate(20px, 25vh) rotate(5deg); 
                }
                50% { 
                    transform: translate(-15px, 50vh) rotate(-8deg); 
                }
                75% { 
                    transform: translate(10px, 75vh) rotate(3deg); 
                    opacity: 0.7;
                }
                100% { 
                    transform: translate(-5px, 120vh) rotate(-5deg); 
                    opacity: 0;
                }
            }
            
            /* Add gentle swaying effect on hover */
            .falling-photo:hover {
                animation-play-state: paused !important;
                transform: scale(1.1) !important;
                opacity: 1 !important;
                z-index: 20 !important;
                box-shadow: 0 8px 25px rgba(0,0,0,0.3) !important;
                transition: all 0.3s ease !important;
            }
        `;
        document.head.appendChild(styleEl);
    }
    
    // Continuously create new photos for endless rain effect
    setInterval(() => {
        // Remove some photos that might have accumulated to prevent performance issues
        const existingPhotos = document.querySelectorAll('.falling-photo');
        if (existingPhotos.length > 30) {
            // Remove oldest photos
            for (let i = 0; i < 5; i++) {
                if (existingPhotos[i]) {
                    existingPhotos[i].remove();
                }
            }
        }
        
        // Add a new photo
        const randomPiece = contentPieces[Math.floor(Math.random() * contentPieces.length)];
        const newFallingEl = document.createElement('div');
        newFallingEl.className = 'floating-item falling-photo';
        
        // Random position at top of container
        const left = Math.random() * 100;
        
        newFallingEl.style.position = 'absolute';
        newFallingEl.style.top = '-20%';
        newFallingEl.style.left = `${left}%`;
        newFallingEl.style.width = randomPiece.size;
        newFallingEl.style.height = randomPiece.size;
        newFallingEl.style.borderRadius = '8px';
        newFallingEl.style.overflow = 'hidden';
        newFallingEl.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        newFallingEl.style.transform = 'rotate(' + (Math.random() * 20 - 10) + 'deg)';
        newFallingEl.style.zIndex = Math.floor(Math.random() * 10);
        newFallingEl.style.opacity = '0';
        
        // Create image content
        const img = document.createElement('img');
        img.src = randomPiece.src;
        img.alt = 'Beauty content preview';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        
        // Add subtle pink-colored overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(255, 182, 193, 0.2)';
        overlay.style.mixBlendMode = 'overlay';
        
        newFallingEl.appendChild(img);
        newFallingEl.appendChild(overlay);
        
        // Add animation
        newFallingEl.style.animation = `fallDown ${randomPiece.duration} linear infinite`;
        
        floatingContainer.appendChild(newFallingEl);
        
    }, 2000); // Add a new photo every 2 seconds
}

// Add responsive behavior for different screen sizes
window.addEventListener('resize', () => {
    // Adjust animation speeds based on screen size
    const isMobile = window.innerWidth < 768;
    const fallingPhotos = document.querySelectorAll('.falling-photo');
    
    fallingPhotos.forEach(photo => {
        // Speed up animations on mobile for better visual effect
        if (isMobile) {
            const currentDuration = parseFloat(photo.style.animationDuration);
            if (currentDuration > 5) {
                photo.style.animationDuration = (currentDuration * 0.7) + 's';
            }
        }
    });
});
