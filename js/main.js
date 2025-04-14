/**
 * Premium Content Creator Website
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    let animationsEnabled = true;
    
    // Get preferences from localStorage if available
    if (localStorage.getItem('animationsEnabled') === 'false') {
        animationsEnabled = false;
        document.documentElement.classList.add('animations-disabled');
        document.querySelector('.toggle-status').textContent = 'Off';
    }

    // Header scroll effect
    const header = document.querySelector('.site-header');
    const scrollThreshold = 100;

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    // Mobile menu functionality
    setupMobileMenu();

    // Content carousel
    setupContentCarousel();

    // Animate on scroll
    setupScrollAnimations();

    // Animate audience metrics counter
    setupCounters();

    // Newsletter form submission
    setupNewsletterForm();

    // Animation toggle
    setupAnimationToggle();

    // Background content for hero section
    setupHeroBackground();

    // Setup floating content in CTA section
    setupFloatingContent();
});

/**
 * Setup the mobile menu functionality
 */
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    
    if (!hamburger) return;
    
    // Create mobile menu elements if they don't exist
    if (!document.querySelector('.mobile-menu')) {
        // Create menu overlay
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
        
        // Create mobile menu
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        // Clone navigation items
        const navItems = document.querySelector('.main-nav ul').cloneNode(true);
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.className = 'mobile-menu-close';
        closeButton.innerHTML = '&times;';
        closeButton.setAttribute('aria-label', 'Close menu');
        
        mobileMenu.appendChild(closeButton);
        mobileMenu.appendChild(navItems);
        document.body.appendChild(mobileMenu);
    }
    
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.menu-overlay');
    const closeButton = document.querySelector('.mobile-menu-close');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
    
    // Close mobile menu
    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Enable scrolling
    };
    
    closeButton.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    
    // Close menu on larger screens if window is resized
    window.addEventListener('resize', () => {
        if (window.innerWidth > 767) {
            closeMenu();
        }
    });
}

/**
 * Setup the content carousel
 */
function setupContentCarousel() {
    const carousel = document.querySelector('.content-carousel');
    if (!carousel) return;
    
    const cards = carousel.querySelectorAll('.content-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    if (!cards.length) return;
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight);
    
    // Update carousel position
    const updateCarousel = (index) => {
        // Calculate scroll position to center the card
        const scrollPosition = cardWidth * index;
        carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        // Update active dot
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    };
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const newIndex = Math.max(0, currentIndex - 1);
            updateCarousel(newIndex);
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const newIndex = Math.min(cards.length - 1, currentIndex + 1);
            updateCarousel(newIndex);
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateCarousel(index);
        });
    });
    
    // Scroll snap on carousel
    carousel.addEventListener('scroll', () => {
        clearTimeout(carousel.scrollTimeout);
        carousel.scrollTimeout = setTimeout(() => {
            const scrollLeft = carousel.scrollLeft;
            const activeIndex = Math.round(scrollLeft / cardWidth);
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === activeIndex);
            });
            
            currentIndex = activeIndex;
        }, 100);
    });
    
    // Touch support
    let startX;
    let scrollLeft;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    }, { passive: true });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!startX) return;
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX);
        carousel.scrollLeft = scrollLeft - walk;
    }, { passive: true });
}

/**
 * Setup the scroll animations
 */
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (!animatedElements.length) {
        // Add animate-on-scroll class to various elements
        const elements = [
            ...document.querySelectorAll('h2'),
            ...document.querySelectorAll('.content-card'),
            ...document.querySelectorAll('.metric-card'),
            ...document.querySelectorAll('.service-card'),
            ...document.querySelectorAll('.testimonial-card'),
            ...document.querySelectorAll('.call-to-action p'),
            ...document.querySelectorAll('.newsletter-signup p')
        ];
        
        elements.forEach(element => {
            if (!element.closest('.hero')) { // Don't animate hero elements this way
                element.classList.add('animate-on-scroll');
            }
        });
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Check elements on scroll
    function checkElements() {
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', checkElements);
    
    // Check elements on page load
    checkElements();
}

/**
 * Setup the audience metrics counters
 */
function setupCounters() {
    const counters = document.querySelectorAll('.follower-count');
    
    if (!counters.length) return;
    
    // Function to animate counting
    function animateCounter(counter, target) {
        let count = 0;
        const duration = 2500; // 2.5 seconds for more dramatic effect
        const frameRate = 60;
        let increment = target / (duration / 1000 * frameRate);
        
        // Use easeOutExpo for more dynamic animation
        // Starts fast and slows down towards the end
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
            counter.textContent = formatNumber(currentCount);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                counter.textContent = formatNumber(target);
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
    
    // Format number with commas
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
 * Setup the newsletter form
 */
function setupNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;
    
    const confirmationEl = form.querySelector('.form-confirmation');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const email = form.querySelector('input[type="email"]').value;
        
        // In a real site, you would send this data to your server
        // This is just a simulation
        setTimeout(() => {
            // Show confirmation message
            if (confirmationEl) {
                confirmationEl.style.display = 'block';
            }
            
            // Clear form
            form.querySelector('input[type="email"]').value = '';
            
            // Show confetti animation
            showConfetti();
        }, 1000);
    });
}

/**
 * Show confetti animation
 */
function showConfetti() {
    // Simplified confetti effect
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);
    
    // Create confetti pieces
    const colors = ['#FFB6C1', '#FFC300', '#FFFFFF'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.position = 'absolute';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.top = '-50px';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.opacity = Math.random() * 0.5 + 0.5;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        confettiContainer.appendChild(confetti);
        
        // Animate fall
        const speed = Math.random() * 3 + 2;
        const direction = Math.random() * 6 - 3;
        let top = -50;
        
        const fallInterval = setInterval(() => {
            top += speed;
            const left = parseFloat(confetti.style.left) + direction;
            confetti.style.top = top + 'px';
            confetti.style.left = left + 'vw';
            confetti.style.transform = `rotate(${parseFloat(confetti.style.transform.replace('rotate(', '').replace('deg)', '')) + 5}deg)`;
            
            if (top > window.innerHeight) {
                clearInterval(fallInterval);
                confetti.remove();
            }
        }, 20);
    }
    
    // Remove confetti container after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

/**
 * Setup animation toggle
 */
function setupAnimationToggle() {
    const toggle = document.querySelector('.animation-toggle');
    if (!toggle) return;
    
    toggle.addEventListener('click', () => {
        const isEnabled = toggle.querySelector('.toggle-status').textContent === 'On';
        
        if (isEnabled) {
            document.documentElement.classList.add('animations-disabled');
            toggle.querySelector('.toggle-status').textContent = 'Off';
            localStorage.setItem('animationsEnabled', 'false');
            
            // Pause falling photos animations
            const fallingPhotos = document.querySelectorAll('.falling-photo');
            fallingPhotos.forEach(photo => {
                photo.style.animationPlayState = 'paused';
                photo.style.opacity = '0.3'; // Dim the photos
            });
        } else {
            document.documentElement.classList.remove('animations-disabled');
            toggle.querySelector('.toggle-status').textContent = 'On';
            localStorage.setItem('animationsEnabled', 'true');
            
            // Resume falling photos animations
            const fallingPhotos = document.querySelectorAll('.falling-photo');
            fallingPhotos.forEach(photo => {
                photo.style.animationPlayState = 'running';
                photo.style.opacity = ''; // Reset to original opacity
            });
        }
    });
}

/**
 * Setup hero background
 */
function setupHeroBackground() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;
    
    // Images for crossfade (in a real site, these would be your actual content)
    const backgroundImages = [
        'images/hero-1.jpg',
        'images/hero-2.jpg',
        'images/hero-3.jpg'
    ];
    
    // Create background elements
    let currentIndex = 0;
    
    // Create initial background
    const createBackground = (index) => {
        const img = document.createElement('div');
        img.className = 'hero-bg-item';
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.backgroundImage = `url(${backgroundImages[index]})`;
        img.style.backgroundSize = 'cover';
        img.style.backgroundPosition = 'center';
        img.style.opacity = '1';
        img.style.transition = 'opacity 1s ease';
        
        return img;
    };
    
    // Initial background
    heroBackground.appendChild(createBackground(0));
    
    // Crossfade function
    function crossfade() {
        if (backgroundImages.length <= 1) return;
        
        const items = heroBackground.querySelectorAll('.hero-bg-item');
        const current = items[0];
        const nextIndex = (currentIndex + 1) % backgroundImages.length;
        const next = createBackground(nextIndex);
        next.style.opacity = '0';
        
        heroBackground.appendChild(next);
        
        // Trigger reflow
        void next.offsetWidth;
        
        // Fade in next, fade out current
        next.style.opacity = '1';
        current.style.opacity = '0';
        
        // Clean up after transition
        setTimeout(() => {
            current.remove();
        }, 1000);
        
        currentIndex = nextIndex;
    }
    
    // Start crossfade interval
    setInterval(crossfade, 5000);
}

/**
 * Setup floating content in CTA section
 */
function setupFloatingContent() {
    const floatingContainer = document.querySelector('.floating-content');
    if (!floatingContainer) return;
    
    // Sample content pieces for floating effect using our actual images
    const contentPieces = [
        { type: 'image', src: 'images/glam_by_dina1.jpg' },
        { type: 'image', src: 'images/glam_by_dina3.jpg' },
        { type: 'image', src: 'images/glam_by_dina4.jpg' },
        { type: 'image', src: 'images/glam_by_dina5.jpg' },
        { type: 'image', src: 'images/glam_by_dina6.jpg' },
        { type: 'image', src: 'images/glam_by_dina7.jpg' },
        { type: 'image', src: 'images/glam_by_dina8.jpg' }
    ];
    
    // Create floating elements
    contentPieces.forEach((piece, index) => {
        const floatingEl = document.createElement('div');
        floatingEl.className = 'floating-item';
        
        // Set random position
        const top = Math.random() * 80 + 10; // 10% to 90%
        const left = Math.random() * 80 + 10; // 10% to 90%
        const size = Math.random() * 30 + 60; // 60px to 90px
        const rotation = Math.random() * 20 - 10; // -10deg to 10deg
        
        floatingEl.style.position = 'absolute';
        floatingEl.style.top = `${top}%`;
        floatingEl.style.left = `${left}%`;
        floatingEl.style.width = `${size}px`;
        floatingEl.style.height = `${size}px`;
        floatingEl.style.borderRadius = '8px';
        floatingEl.style.overflow = 'hidden';
        floatingEl.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        floatingEl.style.transform = `rotate(${rotation}deg)`;
        floatingEl.style.zIndex = Math.floor(Math.random() * 5); // Random z-index for layering
        floatingEl.style.opacity = (Math.random() * 0.4 + 0.2).toFixed(2); // Between 0.2 and 0.6
        
        // Create content based on type
        if (piece.type === 'image') {
            const img = document.createElement('img');
            img.src = piece.src;
            img.alt = 'Content preview';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            
            floatingEl.appendChild(img);
        }
        
        // Add animation with unique parameters for each item
        const duration = Math.random() * 10 + 15; // 15-25 seconds
        const delay = index * 1.2; // Staggered delays
        floatingEl.style.animation = `float ${duration}s ease-in-out infinite`;
        floatingEl.style.animationDelay = `${delay}s`;
        
        floatingContainer.appendChild(floatingEl);
    });
    
    // Add improved floating animation keyframes if not exist
    if (!document.querySelector('#floating-keyframes')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'floating-keyframes';
        styleEl.textContent = `
            @keyframes float {
                0% { transform: translate(0, 0) rotate(0deg); }
                15% { transform: translate(15px, -10px) rotate(5deg); }
                30% { transform: translate(5px, 15px) rotate(-3deg); }
                45% { transform: translate(-15px, 10px) rotate(2deg); }
                60% { transform: translate(10px, 5px) rotate(-2deg); }
                75% { transform: translate(-5px, -15px) rotate(3deg); }
                90% { transform: translate(-10px, 5px) rotate(-5deg); }
                100% { transform: translate(0, 0) rotate(0deg); }
            }
        `;
        document.head.appendChild(styleEl);
    }
}
