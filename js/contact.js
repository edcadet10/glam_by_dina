/**
 * Contact Page JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Multi-step form functionality
    setupMultiStepForm();
    
    // Availability calendar
    setupAvailabilityCalendar();
    
    // Email template functionality
    setupEmailTemplate();
    
    // Form validation and submission
    setupFormSubmission();
});

/**
 * Setup multi-step form functionality
 */
function setupMultiStepForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const formSteps = form.querySelectorAll('.form-step');
    const progressFill = document.querySelector('.progress-fill');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextButtons = form.querySelectorAll('.next-btn');
    const backButtons = form.querySelectorAll('.back-btn');
    
    // Update progress bar
    function updateProgress(step) {
        const progress = (step / formSteps.length) * 100;
        progressFill.style.width = `${progress}%`;
        
        // Update progress steps
        progressSteps.forEach((stepEl, index) => {
            if (index + 1 < step) {
                stepEl.classList.add('completed');
                stepEl.classList.remove('active');
            } else if (index + 1 === step) {
                stepEl.classList.add('active');
                stepEl.classList.remove('completed');
            } else {
                stepEl.classList.remove('active', 'completed');
            }
        });
    }
    
    // Go to specific step
    function goToStep(step) {
        formSteps.forEach((stepEl, index) => {
            stepEl.classList.toggle('active', index + 1 === step);
        });
        
        updateProgress(step);
        
        // Scroll to top of form
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Validate current step
    function validateStep(stepNumber) {
        const currentStep = form.querySelector(`.form-step[data-step="${stepNumber}"]`);
        const requiredFields = currentStep.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                
                // Add error message if it doesn't exist
                if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'This field is required';
                    field.parentNode.insertBefore(errorMessage, field.nextSibling);
                }
            } else {
                field.classList.remove('error');
                
                // Remove error message if it exists
                if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
                    field.nextElementSibling.remove();
                }
            }
        });
        
        return isValid;
    }
    
    // Next button click handlers
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = parseInt(button.closest('.form-step').getAttribute('data-step'));
            const nextStep = parseInt(button.getAttribute('data-next'));
            
            if (validateStep(currentStep)) {
                goToStep(nextStep);
            }
        });
    });
    
    // Back button click handlers
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            const prevStep = parseInt(button.getAttribute('data-back'));
            goToStep(prevStep);
        });
    });
    
    // Initialize form - check URL params to see if we should pre-select a service
    function initializeForm() {
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');
        const packageParam = urlParams.get('package');
        
        // Pre-select service if specified in URL
        if (serviceParam) {
            const serviceSelect = document.getElementById('service');
            if (serviceSelect) {
                // Find the option that matches the service parameter
                const options = Array.from(serviceSelect.options);
                const matchingOption = options.find(option => option.value === serviceParam);
                
                if (matchingOption) {
                    matchingOption.selected = true;
                }
            }
        }
        
        // If package is specified, update project type and budget range accordingly
        if (packageParam) {
            // Wait until step 2 is visible
            const setPackageDetails = () => {
                const projectTypeSelect = document.getElementById('project-type');
                const budgetSelect = document.getElementById('budget');
                
                if (projectTypeSelect && budgetSelect) {
                    // Set project type based on package
                    if (packageParam === 'essential') {
                        setSelectValue(projectTypeSelect, 'one-time');
                        setSelectValue(budgetSelect, 'under-5k');
                    } else if (packageParam === 'premium') {
                        setSelectValue(projectTypeSelect, 'ongoing');
                        setSelectValue(budgetSelect, '5k-10k');
                    } else if (packageParam === 'enterprise') {
                        setSelectValue(projectTypeSelect, 'ongoing');
                        setSelectValue(budgetSelect, '10k-25k');
                    }
                }
            };
            
            // Helper function to set select value
            function setSelectValue(selectElement, value) {
                const options = Array.from(selectElement.options);
                const matchingOption = options.find(option => option.value === value);
                
                if (matchingOption) {
                    matchingOption.selected = true;
                }
            }
            
            // Add listener for next button click to set package details when step 2 becomes visible
            const firstNextBtn = document.querySelector('.form-step[data-step="1"] .next-btn');
            if (firstNextBtn) {
                firstNextBtn.addEventListener('click', () => {
                    setTimeout(setPackageDetails, 100);
                });
            }
        }
    }
    
    // Run initialization
    initializeForm();
    
    // Add form input event listeners to remove error styling when user starts typing
    const formInputs = form.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
            
            // Remove error message if it exists
            if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                input.nextElementSibling.remove();
            }
        });
    });
}

/**
 * Setup availability calendar
 */
function setupAvailabilityCalendar() {
    const calendarContainer = document.querySelector('.calendar-days');
    const currentMonthElement = document.querySelector('.current-month');
    const prevMonthButton = document.querySelector('.month-nav.prev');
    const nextMonthButton = document.querySelector('.month-nav.next');
    
    if (!calendarContainer || !currentMonthElement || !prevMonthButton || !nextMonthButton) return;
    
    // Current date for initial rendering
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Sample availability data (in a real application, this would come from a server)
    // status: 0 = unavailable, 1 = limited availability, 2 = available
    const availabilityData = {
        // Format: 'YYYY-MM-DD': status
        '2025-04-15': 2,
        '2025-04-16': 2,
        '2025-04-17': 1,
        '2025-04-18': 0,
        '2025-04-21': 2,
        '2025-04-22': 2,
        '2025-04-23': 1,
        '2025-04-24': 0,
        '2025-04-25': 0,
        '2025-04-28': 1,
        '2025-04-29': 1,
        '2025-04-30': 2,
        '2025-05-01': 2,
        '2025-05-02': 2,
        '2025-05-05': 1,
        '2025-05-06': 1,
        '2025-05-07': 0,
        '2025-05-08': 0,
        '2025-05-09': 0
    };
    
    // Format date as YYYY-MM-DD
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Get availability status for a date
    function getAvailabilityStatus(date) {
        const dateString = formatDate(date);
        return availabilityData[dateString] || 0; // Default to unavailable
    }
    
    // Render calendar for current month
    function renderCalendar() {
        // Clear existing calendar
        calendarContainer.innerHTML = '';
        
        // Update month/year display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        
        // Get first day of month and number of days
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        
        // Get day of week for first day (0 = Sunday, 6 = Saturday)
        const firstDayOfWeek = firstDay.getDay();
        
        // Add days from previous month
        const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            const dayNumber = daysInPrevMonth - i;
            const date = new Date(currentYear, currentMonth - 1, dayNumber);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day outside-month';
            dayElement.textContent = dayNumber;
            dayElement.setAttribute('data-date', formatDate(date));
            
            calendarContainer.appendChild(dayElement);
        }
        
        // Add days of current month
        const today = new Date();
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentYear, currentMonth, i);
            const isToday = i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = i;
            dayElement.setAttribute('data-date', formatDate(date));
            
            // Add today class if applicable
            if (isToday) {
                dayElement.classList.add('today');
            }
            
            // Add availability class
            const availabilityStatus = getAvailabilityStatus(date);
            if (availabilityStatus === 2) {
                dayElement.classList.add('available');
            } else if (availabilityStatus === 1) {
                dayElement.classList.add('limited');
            } else {
                dayElement.classList.add('booked');
            }
            
            calendarContainer.appendChild(dayElement);
        }
        
        // Add days from next month to fill remaining grid cells
        const totalDaysRendered = firstDayOfWeek + daysInMonth;
        const remainingCells = 7 - (totalDaysRendered % 7);
        if (remainingCells < 7) {
            for (let i = 1; i <= remainingCells; i++) {
                const date = new Date(currentYear, currentMonth + 1, i);
                
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day outside-month';
                dayElement.textContent = i;
                dayElement.setAttribute('data-date', formatDate(date));
                
                calendarContainer.appendChild(dayElement);
            }
        }
        
        // Add click handlers to days
        const days = calendarContainer.querySelectorAll('.calendar-day');
        days.forEach(day => {
            day.addEventListener('click', () => {
                // Only allow clicking on available or limited days
                if (day.classList.contains('available') || day.classList.contains('limited')) {
                    // Remove selected class from all days
                    days.forEach(d => d.classList.remove('selected'));
                    
                    // Add selected class to clicked day
                    day.classList.add('selected');
                    
                    // In a real application, you would update a hidden form field with the selected date
                    const selectedDate = day.getAttribute('data-date');
                    console.log('Selected date:', selectedDate);
                    
                    // Scroll to the contact form
                    document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    // Navigate to previous month
    prevMonthButton.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });
    
    // Navigate to next month
    nextMonthButton.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
    
    // Initial rendering
    renderCalendar();
}

/**
 * Setup email template functionality
 */
function setupEmailTemplate() {
    const emailTemplateButton = document.querySelector('.connect-icon.email-template').closest('.connect-option');
    
    if (!emailTemplateButton) return;
    
    // Email template click handler
    emailTemplateButton.addEventListener('click', event => {
        event.preventDefault();
        
        // Create email template with pre-filled subject and body
        const subject = 'Content Creation Inquiry';
        const body = `Hello,

I'm interested in discussing a potential content creation project with you. Here are some brief details:

Project type: 
Timeline: 
Budget range: 

Looking forward to hearing from you!

Best regards,
[Your Name]`;
        
        // Create mailto link
        const mailtoLink = `mailto:hello@contentcreator.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open email client
        window.location.href = mailtoLink;
    });
}

/**
 * Setup form validation and submission
 */
function setupFormSubmission() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', event => {
        event.preventDefault();
        
        // Validate final step
        if (!validateStep(3)) return;
        
        // Show loading state
        const submitButton = form.querySelector('.submit-btn');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
        
        // In a real application, you would send the form data to your server here
        // For this demo, we'll just simulate a server request with a timeout
        setTimeout(() => {
            // Hide the form steps
            const formSteps = form.querySelectorAll('.form-step');
            formSteps.forEach(step => {
                step.style.display = 'none';
            });
            
            // Hide the progress bar
            const progressBar = document.querySelector('.form-progress');
            if (progressBar) {
                progressBar.style.display = 'none';
            }
            
            // Show the success message
            const successMessage = form.querySelector('.form-success');
            if (successMessage) {
                successMessage.classList.add('active');
            }
            
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Reset form (in a real application, you might not want to do this)
            form.reset();
        }, 1500);
    });
    
    // Helper function to validate a specific step
    function validateStep(stepNumber) {
        const currentStep = form.querySelector(`.form-step[data-step="${stepNumber}"]`);
        const requiredFields = currentStep.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                
                // Add error message if it doesn't exist
                if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'This field is required';
                    field.parentNode.insertBefore(errorMessage, field.nextSibling);
                }
            } else {
                field.classList.remove('error');
                
                // Remove error message if it exists
                if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
                    field.nextElementSibling.remove();
                }
            }
        });
        
        return isValid;
    }
}