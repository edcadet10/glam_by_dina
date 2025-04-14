/**
 * Testimonials Page Functionality
 * Handles filtering, video testimonials, and load more functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    setupTestimonialFilters();
    setupVideoTestimonials();
    setupLoadMoreButton();
    initScrollAnimation();
});

/**
 * Setup testimonial filtering functionality
 */
function setupTestimonialFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    // Initialize counts
    updateFilterCounts(testimonialCards);
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active class
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter testimonials
            testimonialCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    
                    // Trigger animation if card is in viewport
                    if (isInViewport(card)) {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, 100);
                    }
                } else {
                    card.style.display = 'none';
                    card.classList.remove('visible');
                }
            });
            
            // Check if load more button should be visible
            checkLoadMoreVisibility();
        });
    });
}

/**
 * Update filter button counts
 */
function updateFilterCounts(testimonialCards) {
    const categories = {
        'all': 0,
        'video': 0,
        'photography': 0,
        'social': 0,
        'brand': 0
    };
    
    // Count testimonials by category
    testimonialCards.forEach(card => {
        categories.all++;
        
        const category = card.getAttribute('data-category');
        if (categories[category] !== undefined) {
            categories[category]++;
        }
    });
    
    // Update filter button text with counts
    document.querySelectorAll('.filter-button').forEach(button => {
        const filter = button.getAttribute('data-filter');
        if (categories[filter] !== undefined) {
            // Add count to button text
            const count = categories[filter];
            
            // Only add count if it doesn't already exist
            if (!button.querySelector('.count')) {
                const countSpan = document.createElement('span');
                countSpan.className = 'count';
                countSpan.textContent = `(${count})`;
                button.appendChild(countSpan);
            } else {
                button.querySelector('.count').textContent = `(${count})`;
            }
        }
    });
}

/**
 * Setup video testimonial functionality
 */
function setupVideoTestimonials() {
    const videoTestimonials = document.querySelectorAll('.video-testimonial');
    
    videoTestimonials.forEach(testimonial => {
        const playButton = testimonial.querySelector('.play-button');
        if (!playButton) return;
        
        playButton.addEventListener('click', () => {
            // Get thumbnail image and create video element
            const thumbnail = testimonial.querySelector('.video-thumbnail');
            const thumbnailImg = thumbnail.querySelector('img');
            
            // Create video element (in a real site, you would use the actual video URL)
            const video = document.createElement('video');
            video.controls = true;
            video.autoplay = true;
            video.className = 'testimonial-video';
            
            // Use a placeholder source - in a real site, use actual video source
            const source = document.createElement('source');
            source.src = thumbnailImg.src.replace('.jpg', '.mp4');
            source.type = 'video/mp4';
            
            video.appendChild(source);
            
            // Replace thumbnail with video
            thumbnail.innerHTML = '';
            thumbnail.appendChild(video);
            
            // Add fallback text
            const fallback = document.createElement('p');
            fallback.textContent = 'Your browser does not support the video tag.';
            video.appendChild(fallback);
        });
    });
}

/**
 * Setup load more functionality
 */
function setupLoadMoreButton() {
    const loadMoreButton = document.querySelector('.load-more');
    if (!loadMoreButton) return;
    
    // In a real site, this would load new testimonials from the server
    // For this demo, we'll simulate loading more testimonials
    loadMoreButton.addEventListener('click', () => {
        // Show loading state
        loadMoreButton.textContent = 'Loading...';
        loadMoreButton.disabled = true;
        
        // Simulate loading delay
        setTimeout(() => {
            // Clone existing testimonials
            const testimonialGrid = document.querySelector('.testimonials-grid');
            const existingTestimonials = document.querySelectorAll('.testimonial-card:not(.featured-testimonial)');
            
            // In a real site, you would fetch new testimonials from the server
            // For this demo, we'll clone existing ones with slight modifications
            existingTestimonials.forEach((testimonial, index) => {
                if (index < 2) { // Only clone a couple to avoid too many duplicates
                    const clone = testimonial.cloneNode(true);
                    
                    // Modify clone to make it look different
                    const quote = clone.querySelector('blockquote');
                    if (quote) {
                        // Slightly modify the quote text
                        quote.textContent = quote.textContent.split(' ').reverse().join(' ');
                    }
                    
                    // Add a different category to mix things up
                    const currentCategory = clone.getAttribute('data-category');
                    const categories = ['video', 'photography', 'social', 'brand'];
                    const newCategory = categories.find(cat => cat !== currentCategory) || currentCategory;
                    clone.setAttribute('data-category', newCategory);
                    
                    // Update service tag
                    const serviceTag = clone.querySelector('.service-tag');
                    if (serviceTag) {
                        serviceTag.textContent = newCategory.charAt(0).toUpperCase() + newCategory.slice(1);
                    }
                    
                    // Apply animation class
                    clone.classList.add('animate-on-scroll');
                    clone.classList.remove('visible');
                    
                    // Add to grid
                    testimonialGrid.appendChild(clone);
                }
            });
            
            // Reset button state
            loadMoreButton.textContent = 'Load More Testimonials';
            loadMoreButton.disabled = false;
            
            // Update filter counts
            updateFilterCounts(document.querySelectorAll('.testimonial-card'));
            
            // Apply current filter
            const activeFilter = document.querySelector('.filter-button.active');
            if (activeFilter) {
                activeFilter.click();
            }
            
            // Initialize scroll animations for new elements
            initScrollAnimation();
            
            // Check if we should hide the load more button (in a real site)
            // This would be based on whether there are more testimonials to load
            checkLoadMoreVisibility();
        }, 1500);
    });
    
    // Initial check
    checkLoadMoreVisibility();
}

/**
 * Check if load more button should be visible
 */
function checkLoadMoreVisibility() {
    const loadMoreButton = document.querySelector('.load-more');
    if (!loadMoreButton) return;
    
    // In a real site, this would check if there are more testimonials to load
    // For this demo, we'll hide after a certain number are shown
    const visibleTestimonials = Array.from(document.querySelectorAll('.testimonial-card')).filter(
        card => window.getComputedStyle(card).display !== 'none'
    );
    
    // If we have more than 10 visible testimonials, hide the button
    if (visibleTestimonials.length > 10) {
        loadMoreButton.style.display = 'none';
    } else {
        loadMoreButton.style.display = 'inline-block';
    }
}

/**
 * Initialize scroll animations for testimonial cards
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
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}
