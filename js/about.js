/**
 * About Page Functionality
 * Handles animations, counters, and interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initScrollAnimation();
    
    // Initialize counters for stats
    setupCounters();
    
    // Initialize location bars animation
    setupLocationBars();
});

/**
 * Initialize scroll animations for about page elements
 */
function initScrollAnimation() {
    // Check if animations are enabled
    const animationsDisabled = document.documentElement.classList.contains('animations-disabled');
    
    if (animationsDisabled) {
        // If animations are disabled, show all elements immediately
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            element.classList.add('visible');
        });
        return;
    }
    
    // Set up scroll observer
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If element is in viewport
            if (entry.isIntersecting) {
                // Add visible class with delay for staggered appearance
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, Array.from(document.querySelectorAll('.animate-on-scroll')).indexOf(entry.target) * 100);
                
                // Unobserve element after it's been animated
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll:not(.visible)').forEach(element => {
        observer.observe(element);
    });
}

/**
 * Setup audience statistics counters
 */
function setupCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (!counters.length) return;
    
    // Function to animate counting
    function animateCounter(counter, target) {
        let count = 0;
        const duration = 2000; // 2 seconds
        const frameRate = 60;
        const increment = target / (duration / 1000 * frameRate);
        
        // Use easeOutExpo for more dynamic animation
        const easeOutExpo = (t) => {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        };
        
        let startTime = null;
        
        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutExpo(progress);
            
            const currentCount = Math.floor(target * easedProgress);
            counter.textContent = currentCount;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                counter.textContent = target;
                // Add a small scale animation when counter completes
                counter.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    counter.style.transform = 'scale(1)';
                    counter.style.transition = 'transform 0.3s ease';
                }, 50);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Observe counters to start animation when in viewport
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/**
 * Setup location bars animation
 */
function setupLocationBars() {
    const locationBars = document.querySelectorAll('.location-fill');
    
    if (!locationBars.length) return;
    
    // Observe location bars to animate when in viewport
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start with width: 0 and animate to final width
                const bar = entry.target;
                const finalWidth = bar.style.width;
                
                bar.style.width = '0';
                
                // Delay animation slightly for visual effect
                setTimeout(() => {
                    bar.style.width = finalWidth;
                }, 300);
                
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    locationBars.forEach(bar => {
        barObserver.observe(bar);
    });
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}