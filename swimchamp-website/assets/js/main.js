// SwimChamp Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation - support both hamburger and nav-toggle IDs
    const hamburger = document.getElementById('hamburger') || document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('nav-menu-mobile');
            hamburger.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only prevent default and do smooth scrolling for same-page links (starting with #)
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            // For other links (like ../index.html), let the browser handle normal navigation
            // Don't prevent default, so the link works normally
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .credential, .contact-card, .stat');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .service-card,
        .credential,
        .contact-card,
        .stat {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .service-card.animate-in,
        .credential.animate-in,
        .contact-card.animate-in,
        .stat.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-menu-mobile {
            position: fixed;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            padding: 2rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            display: flex !important;
            flex-direction: column;
            gap: 1.5rem;
            z-index: 999;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
            
            .hamburger {
                display: flex !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
            } else {
                this.style.transform = 'translateY(-4px) scale(1.02)';
            }
        });
    });
    
    // Phone number formatting and click tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Analytics tracking could go here
            console.log('Phone call initiated:', this.href);
        });
    });
    
    // Email links click tracking
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Analytics tracking could go here
            console.log('Email initiated:', this.href);
        });
    });
    
    // Dynamic copyright year
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer-bottom p');
    if (copyrightElement && copyrightElement.textContent.includes('2024')) {
        copyrightElement.textContent = copyrightElement.textContent.replace('2024', currentYear);
    }
    
    // Add subtle parallax effect to hero
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero && heroVisual) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < hero.offsetHeight) {
                heroVisual.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // Animate statistics on scroll
    const stats = document.querySelectorAll('.stat-number');
    const animateStats = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                let currentValue = 0;
                const increment = parseFloat(finalValue) / 50;
                
                const timer = setInterval(() => {
                    if (finalValue.includes('%')) {
                        currentValue += increment;
                        if (currentValue >= parseFloat(finalValue)) {
                            currentValue = parseFloat(finalValue);
                            clearInterval(timer);
                        }
                        target.textContent = Math.round(currentValue) + '%';
                    } else if (finalValue.includes('+')) {
                        currentValue += increment;
                        if (currentValue >= parseFloat(finalValue)) {
                            currentValue = parseFloat(finalValue);
                            clearInterval(timer);
                        }
                        target.textContent = Math.round(currentValue) + '+';
                    } else if (finalValue.includes('-')) {
                        // Handle ranges like "2-3"
                        return; // Don't animate ranges
                    } else {
                        currentValue += increment;
                        if (currentValue >= parseFloat(finalValue)) {
                            currentValue = parseFloat(finalValue);
                            clearInterval(timer);
                        }
                        target.textContent = Math.round(currentValue);
                    }
                }, 50);
                
                observer.unobserve(target);
            }
        });
    };
    
    const statsObserver = new IntersectionObserver(animateStats, {
        threshold: 0.5
    });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Add loading animation for images
    const images = document.querySelectorAll('svg');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in-out';
        
        // Simulate loading
        setTimeout(() => {
            img.style.opacity = '1';
        }, 100);
    });
    
    // Contact Form Handler - handles all booking forms
    const bookingForms = [
        'bookingForm',
        'booking-form',
        'quick-booking-form',
        'basiszwemslagen-booking-form',
        'watergewenning-booking-form'
    ];

    bookingForms.forEach(formId => {
        const bookingForm = document.getElementById(formId);
        const formSuccess = document.getElementById('form-success');
        const formError = document.getElementById('form-error');

        if (bookingForm) {
            bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(bookingForm);
            const data = {};
            
            // Convert form data to object
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Validate required fields
            const requiredFields = ['parentName', 'email', 'phone', 'location', 'lessonType', 'lessonFormat', 'privacy'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const element = document.getElementById(field);
                if (!element || (!element.value.trim() && element.type !== 'checkbox') || (field === 'privacy' && !element.checked)) {
                    isValid = false;
                    if (element) {
                        element.style.borderColor = '#EF4444';
                        
                        // Reset border color after 3 seconds
                        setTimeout(() => {
                            element.style.borderColor = '';
                        }, 3000);
                    }
                }
            });
            
            if (!isValid) {
                // Scroll to first error
                const firstError = bookingForm.querySelector('input[style*="rgb(239, 68, 68)"], select[style*="rgb(239, 68, 68)"]');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }
            
            // Submit form
            submitBookingForm(data, bookingForm);
            });
        }
    });

    function submitBookingForm(data, form) {
        // Hide form and show loading state
        form.style.display = 'none';
        
        // Create loading message
        const loadingDiv = document.createElement('div');
        loadingDiv.innerHTML = `
            <div style="text-align: center; padding: 2rem; background: white; border-radius: 1.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
                <div style="font-size: 2rem; margin-bottom: 1rem;">⏳</div>
                <h3 style="color: #374151; margin-bottom: 0.75rem;">Versturen...</h3>
                <p style="color: #6B7280;">Uw aanvraag wordt verwerkt</p>
            </div>
        `;
        form.parentNode.insertBefore(loadingDiv, form);
        
        // Simulate API call (replace with actual email service)
        setTimeout(() => {
            // Remove loading message
            loadingDiv.remove();
            
            try {
                // Simulate sending email with form data
                sendEmailNotification(data);
                
                // Show success message
                const formSuccess = document.getElementById('form-success');
                if (formSuccess) {
                    formSuccess.style.display = 'block';
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
            } catch (error) {
                // Show error message
                form.style.display = 'block';
                const formError = document.getElementById('form-error');
                if (formError) {
                    formError.style.display = 'block';
                    formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        }, 2000);
    }
    
    function sendEmailNotification(data) {
        // In a real implementation, this would send the data to your backend
        // or use a service like EmailJS, Formspree, or Netlify Forms
        
        console.log('Form submission data:', data);
        
        // Create email content
        const emailContent = `
Nieuwe zwemles aanvraag via SwimChamp website:

CONTACTGEGEVENS:
- Naam ouder/verzorger: ${data.parentName}
- Email: ${data.email}
- Telefoon: ${data.phone}

LEERLING INFORMATIE:
- Naam leerling: ${data.childName || 'Niet opgegeven'}
- Leeftijd: ${data.childAge || 'Niet opgegeven'}

LES DETAILS:
- Gewenste locatie: ${data.location}
- Type les: ${data.lessonType}
- Formaat: ${data.lessonFormat}
- Voorkeur tijd: ${data.preferredTime || 'Geen voorkeur'}

EXTRA INFORMATIE:
- Zwemervaring: ${data.experience || 'Niet opgegeven'}
- Opmerkingen: ${data.message || 'Geen opmerkingen'}

Reactie vereist binnen 24 uur.
        `;
        
        // Log the email content (in production, this would be sent via email service)
        console.log('Email content to send:', emailContent);
        
        // Store in localStorage for testing purposes
        const submissions = JSON.parse(localStorage.getItem('swimchamp-submissions') || '[]');
        submissions.push({
            ...data,
            timestamp: new Date().toISOString(),
            id: Date.now()
        });
        localStorage.setItem('swimchamp-submissions', JSON.stringify(submissions));
        
        return true; // Simulate successful email sending
    }
    
    // Service card click handling
    serviceCards.forEach(card => {
        const link = card.querySelector('a.btn-service');
        if (link) {
            card.addEventListener('click', function(e) {
                // Only trigger if not clicking on the button directly
                if (!e.target.closest('.btn-service')) {
                    link.click();
                }
            });
            
            // Add cursor pointer to indicate clickability
            card.style.cursor = 'pointer';
        }
    });
    
    // Add subtle animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Auto-select location based on page URL or URL parameters
    function autoSelectLocation() {
        const currentPage = window.location.pathname.toLowerCase();
        const urlParams = new URLSearchParams(window.location.search);
        let defaultLocation = '';

        // Check URL parameters first (e.g., ?location=merelbeke)
        const locationParam = urlParams.get('location');
        if (locationParam && ['merelbeke', 'aalter', 'eeklo'].includes(locationParam.toLowerCase())) {
            defaultLocation = locationParam.toLowerCase();
        }
        // Then check page URL
        else if (currentPage.includes('merelbeke')) {
            defaultLocation = 'merelbeke';
        } else if (currentPage.includes('aalter')) {
            defaultLocation = 'aalter';
        } else if (currentPage.includes('eeklo')) {
            defaultLocation = 'eeklo';
        }

        if (defaultLocation) {
            // Find all location select elements and set their value
            const locationSelects = document.querySelectorAll('select[name="location"]');
            locationSelects.forEach(select => {
                if (select.querySelector(`option[value="${defaultLocation}"]`)) {
                    select.value = defaultLocation;
                    // Add visual indication that location was auto-selected
                    select.style.borderColor = '#10B981';
                    select.style.backgroundColor = '#F0FDF4';

                    // Reset styling after 3 seconds
                    setTimeout(() => {
                        select.style.borderColor = '';
                        select.style.backgroundColor = '';
                    }, 3000);

                    // Trigger change event in case there are any listeners
                    const event = new Event('change', { bubbles: true });
                    select.dispatchEvent(event);
                }
            });

            console.log(`Auto-selected location: ${defaultLocation} based on page URL`);
        }
    }

    // Call auto-select location function
    autoSelectLocation();

    console.log('SwimChamp website loaded successfully! 🏊‍♂️');
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add performance monitoring
window.addEventListener('load', function() {
    // Simple performance logging
    if ('performance' in window) {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    }
});