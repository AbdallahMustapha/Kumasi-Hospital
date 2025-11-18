// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initApp();
});

// Initialize Application
function initApp() {
    // Set up event listeners
    setupEventListeners();
    
    // Set minimum date for appointment to today
    setMinAppointmentDate();
    
    // Enhanced date input functionality
    enhanceDateInput();
    
    // Smooth scrolling for navigation links
    enableSmoothScrolling();
    
    // Add input validation
    setupInputValidation();
}

// Set up event listeners
function setupEventListeners() {
    // Book Appointment buttons
    const bookAppointmentBtn = document.getElementById('bookAppointmentBtn');
    const heroBookBtn = document.getElementById('heroBookBtn');
    const mobileBookBtn = document.getElementById('mobileBookBtn');
    const modal = document.getElementById('appointmentModal');
    const closeModal = document.querySelector('.close');
    
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    // Book Appointment buttons
    if (bookAppointmentBtn) {
        bookAppointmentBtn.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    }
    
    if (heroBookBtn) {
        heroBookBtn.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    }
    
    if (mobileBookBtn) {
        mobileBookBtn.addEventListener('click', function() {
            modal.style.display = 'block';
            mobileNav.classList.remove('active'); // Close mobile menu
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Mobile menu toggle
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }
    
    // Close mobile menu when clicking on links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = 'fas fa-bars';
        });
    });
    
    // Services button
    const servicesBtn = document.getElementById('servicesBtn');
    if (servicesBtn) {
        servicesBtn.addEventListener('click', function() {
            document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Close mobile menu when clicking outside
    window.addEventListener('click', function(event) {
        if (mobileNav.classList.contains('active') && 
            !event.target.closest('.mobile-nav') && 
            !event.target.closest('.mobile-menu-btn')) {
            mobileNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = 'fas fa-bars';
        }
    });
}

// Set minimum date for appointment to today
function setMinAppointmentDate() {
    const appointmentDate = document.querySelector('input[name="appointment_date"]');
    if (appointmentDate) {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        appointmentDate.min = formattedDate;
    }
}

// Enhanced date input functionality
function enhanceDateInput() {
    const dateInput = document.getElementById('appointmentDate');
    
    if (dateInput) {
        // Set minimum date to today
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        dateInput.min = formattedDate;
        
        // Set maximum date to 3 months from now
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        const formattedMaxDate = maxDate.toISOString().split('T')[0];
        dateInput.max = formattedMaxDate;
        
        // Add change event to show selected date
        dateInput.addEventListener('change', function() {
            if (this.value) {
                const selectedDate = new Date(this.value);
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const formattedDate = selectedDate.toLocaleDateString('en-US', options);
                
                // Update help text to show selected date
                const helpText = this.parentElement.querySelector('.date-help');
                if (helpText) {
                    helpText.innerHTML = `✅ Selected: <strong>${formattedDate}</strong>`;
                    helpText.style.color = 'var(--secondary)';
                }
            }
        });
        
        // Add focus event for better UX
        dateInput.addEventListener('focus', function() {
            const helpText = this.parentElement.querySelector('.date-help');
            if (helpText && !this.value) {
                helpText.textContent = '📅 Tap to open calendar and select a date';
                helpText.style.color = 'var(--primary)';
            }
        });
        
        // Reset help text when modal closes
        const modal = document.getElementById('appointmentModal');
        const closeModal = document.querySelector('.close');
        
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                const helpText = dateInput.parentElement.querySelector('.date-help');
                if (helpText) {
                    helpText.textContent = 'Tap to choose a date from calendar';
                    helpText.style.color = 'var(--primary)';
                }
                dateInput.value = ''; // Clear date when modal closes
            });
        }
        
        // Also reset when clicking outside modal
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                const helpText = dateInput.parentElement.querySelector('.date-help');
                if (helpText) {
                    helpText.textContent = 'Tap to choose a date from calendar';
                    helpText.style.color = 'var(--primary)';
                }
                dateInput.value = ''; // Clear date when modal closes
            }
        });
    }
}

// Enable smooth scrolling for navigation links
function enableSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Input validation for all forms
function setupInputValidation() {
    // Name fields - only letters and spaces
    const nameInputs = document.querySelectorAll('input[name="name"]');
    nameInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // Allow only letters and spaces
            this.value = this.value.replace(/[^A-Za-z\s]/g, '');
        });
        
        input.addEventListener('paste', function(e) {
            const pasteData = e.clipboardData.getData('text');
            if (!/^[A-Za-z\s]+$/.test(pasteData)) {
                e.preventDefault();
                alert('Please enter letters only for name field');
            }
        });
    });

    // Phone fields - only numbers and phone characters
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // Allow only numbers, plus, hyphen, space, and parentheses
            this.value = this.value.replace(/[^0-9+\-\s()]/g, '');
        });
        
        input.addEventListener('paste', function(e) {
            const pasteData = e.clipboardData.getData('text');
            if (!/^[0-9+\-\s()]+$/.test(pasteData)) {
                e.preventDefault();
                alert('Please enter numbers only for phone field');
            }
        });

        // Show keyboard as numeric on mobile
        input.setAttribute('inputmode', 'tel');
    });
}

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});