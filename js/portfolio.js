/**
 * Portfolio Page JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Portfolio filtering
    setupPortfolioFilters();
    
    // Initialize Masonry layout (if needed)
    setupMasonryLayout();
    
    // Portfolio item click handling
    setupPortfolioItemClicks();
});

/**
 * Setup portfolio filtering functionality
 */
function setupPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!filterButtons.length || !portfolioItems.length) return;
    
    // Filter items based on category
    function filterItems(category) {
        portfolioItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
        
        // Update active button
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === category);
        });
        
        // Wait for animation to complete then update layout
        setTimeout(() => {
            updateMasonryLayout();
        }, 400);
    }
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            filterItems(filter);
        });
    });
}

/**
 * Setup masonry layout
 */
function setupMasonryLayout() {
    const grid = document.querySelector('.masonry-grid');
    if (!grid) return;
    
    // This is a simplified masonry layout
    // For production, consider using a library like Masonry.js
    updateMasonryLayout();
    
    // Update layout on window resize
    window.addEventListener('resize', updateMasonryLayout);
}

/**
 * Update the masonry layout
 */
function updateMasonryLayout() {
    const grid = document.querySelector('.masonry-grid');
    if (!grid) return;
    
    // This is a simple implementation that ensures a visually appealing layout
    // For production sites, consider using a dedicated library
    
    // Get visible items
    const visibleItems = Array.from(grid.querySelectorAll('.portfolio-item:not(.hidden)'));
    
    // Reset styles for accurate calculations
    visibleItems.forEach(item => {
        item.style.gridRow = '';
        item.style.gridColumn = '';
    });
    
    // Apply special layout for specific items
    // This is just a basic example - in production, you'd want
    // to handle this more dynamically based on content
    if (window.innerWidth > 767) {
        const tallItems = grid.querySelectorAll('.item-image.tall');
        tallItems.forEach(item => {
            const portfolioItem = item.closest('.portfolio-item');
            if (portfolioItem && !portfolioItem.classList.contains('hidden')) {
                portfolioItem.style.gridRow = 'span 2';
            }
        });
        
        const wideItems = grid.querySelectorAll('.item-image.wide');
        wideItems.forEach(item => {
            const portfolioItem = item.closest('.portfolio-item');
            if (portfolioItem && !portfolioItem.classList.contains('hidden') && window.innerWidth > 767) {
                portfolioItem.style.gridColumn = 'span 2';
            }
        });
    }
}

/**
 * Setup portfolio item click handling
 */
function setupPortfolioItemClicks() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!portfolioItems.length) return;
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            // In a real implementation, this would open a modal with more details
            // or navigate to a dedicated project page
            
            const category = item.dataset.category;
            const title = item.querySelector('h3').textContent;
            
            console.log(`Portfolio item clicked: ${title} (${category})`);
            
            // For demonstration purposes, we'll just add a click effect
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = '';
            }, 200);
        });
    });
    
    // Handle play button clicks for video items
    const playButtons = document.querySelectorAll('.play-button');
    
    playButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering the parent item click
            
            const item = button.closest('.portfolio-item');
            const title = item.querySelector('h3').textContent;
            
            console.log(`Video play button clicked: ${title}`);
            
            // In a real implementation, this would open a video player
            // For now, just add a visual effect
            button.style.transform = 'translate(-50%, -50%) scale(0.9)';
            button.style.backgroundColor = 'rgba(255, 195, 0, 0.8)';
            
            setTimeout(() => {
                button.style.transform = 'translate(-50%, -50%) scale(1)';
                button.style.backgroundColor = '';
            }, 300);
        });
    });
}