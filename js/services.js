/**
 * Services Page JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Package tabs functionality
    setupPackageTabs();
    
    // FAQ accordion functionality
    setupFAQAccordion();
    
    // Process timeline animation
    setupProcessTimeline();
});

/**
 * Setup package tabs functionality
 */
function setupPackageTabs() {
    const packageTabs = document.querySelectorAll('.package-tab');
    const packageContents = document.querySelectorAll('.package-content');
    
    if (!packageTabs.length || !packageContents.length) return;
    
    packageTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            packageTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const packageName = tab.getAttribute('data-package');
            const targetContent = document.getElementById(`${packageName}-package`);
            
            packageContents.forEach(content => {
                content.classList.remove('active');
            });
            
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

/**
 * Setup FAQ accordion functionality
 */
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        // Add click event to question
        question.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all items first
            faqItems.forEach(i => {
                i.classList.remove('active');
                const a = i.querySelector('.faq-answer');
                if (a) a.style.maxHeight = null;
            });
            
            // If item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    // Open first FAQ item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const firstAnswer = faqItems[0].querySelector('.faq-answer');
        if (firstAnswer) {
            firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
        }
    }
}

/**
 * Setup process timeline animation
 */
function setupProcessTimeline() {
    const processSteps = document.querySelectorAll('.process-step');
    
    if (!processSteps.length) return;
    
    // Add animation classes
    processSteps.forEach(step => {
        step.classList.add('animate-on-scroll');
    });
    
    // Draw the timeline line as we scroll
    const processTimeline = document.querySelector('.process-timeline');
    if (!processTimeline) return;
    
    const drawTimeline = () => {
        const rect = processTimeline.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Calculate how much of the timeline is visible
        const timelineTop = rect.top;
        const timelineBottom = rect.bottom;
        const timelineHeight = rect.height;
        
        // If timeline is in view
        if (timelineTop < windowHeight && timelineBottom > 0) {
            // Calculate the percentage of the timeline that should be drawn
            let visiblePercentage = 0;
            
            if (timelineTop < 0) {
                // Timeline starts above viewport
                visiblePercentage = Math.min(100, (Math.abs(timelineTop) + windowHeight) / timelineHeight * 100);
            } else {
                // Timeline starts within viewport
                visiblePercentage = Math.min(100, (windowHeight - timelineTop) / timelineHeight * 100);
            }
            
            // Set the timeline progress
            processTimeline.style.setProperty('--timeline-progress', `${visiblePercentage}%`);
            
            // Determine which steps should be active
            processSteps.forEach((step, index) => {
                const stepPercentage = (index + 0.5) / processSteps.length * 100;
                
                if (visiblePercentage >= stepPercentage) {
                    step.classList.add('visible');
                }
            });
        }
    };
    
    // Add a CSS custom property for the timeline progress
    processTimeline.style.setProperty('--timeline-progress', '0%');
    
    // Add the following CSS rule via JavaScript
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .process-timeline::before {
            background-image: linear-gradient(
                var(--pink-1000) calc(var(--timeline-progress, 0%)), 
                transparent calc(var(--timeline-progress, 0%))
            );
        }
    `;
    document.head.appendChild(styleElement);
    
    // Listen for scroll events
    window.addEventListener('scroll', drawTimeline);
    
    // Initial check
    drawTimeline();
}

/**
 * Highlight the service based on URL parameter
 */
function highlightSelectedService() {
    // Check if URL has a hash
    const hash = window.location.hash;
    if (hash) {
        // Find the service card with this ID
        const serviceCard = document.getElementById(hash.substring(1));
        if (serviceCard) {
            // Scroll to the service card with a slight delay
            setTimeout(() => {
                serviceCard.scrollIntoView({ behavior: 'smooth' });
                
                // Add highlight effect
                serviceCard.classList.add('highlight');
                
                // Remove highlight after animation
                setTimeout(() => {
                    serviceCard.classList.remove('highlight');
                }, 2000);
            }, 500);
        }
    }
    
    // Check for service parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam) {
        // Find the service card with this ID
        const serviceCard = document.getElementById(serviceParam);
        if (serviceCard) {
            // Scroll to the service card with a slight delay
            setTimeout(() => {
                serviceCard.scrollIntoView({ behavior: 'smooth' });
                
                // Add highlight effect
                serviceCard.classList.add('highlight');
                
                // Remove highlight after animation
                setTimeout(() => {
                    serviceCard.classList.remove('highlight');
                }, 2000);
            }, 500);
        }
    }
}

// Call the function when the page is loaded
window.addEventListener('load', highlightSelectedService);