// Pricing Section Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const pricingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    pricingCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        pricingObserver.observe(card);
    });

    // Highlight features on hover
    const featureItems = document.querySelectorAll('.pricing-features li');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
            item.style.color = 'var(--primary-brand)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
            item.style.color = 'var(--text-dark)';
        });
    });

    // Handle pricing button clicks - separate booking and contact sections
    document.querySelectorAll('.price-button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Only handle buttons with href attributes
            const href = this.getAttribute('href');
            if (!href || this.closest('form')) return; // Skip if button is in form or has no href
            
            let targetSection;
            if (href === '#booking') {
                targetSection = document.querySelector('#booking');
            } else if (href === '#contact') {
                targetSection = document.querySelector('#contact');
            }

            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // If it's a pricing package button, update the event type in the form
                if (href === '#contact') {
                    const eventTypeSelect = document.getElementById('eventType');
                    if (eventTypeSelect) {
                        // Set event type based on button text
                        if (this.textContent.toLowerCase().includes('wedding')) {
                            eventTypeSelect.value = 'wedding';
                        } else if (this.textContent.toLowerCase().includes('reception')) {
                            eventTypeSelect.value = 'wedding';
                        } else if (this.textContent.toLowerCase().includes('event')) {
                            eventTypeSelect.value = 'corporate';
                        } else {
                            eventTypeSelect.value = 'private';
                        }
                    }
                }
            }
        });
    });

    // Handle pricing button clicks - connect to calendar section
    document.querySelectorAll('.pricing-card .price-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || this.closest('form')) return;
            
            e.preventDefault();
            const targetSection = document.querySelector('#booking');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Set the event type in the calendar based on the package
                const buttonText = this.textContent.toLowerCase();
                let eventType;
                
                if (buttonText.includes('wedding') || buttonText.includes('ceremony')) {
                    eventType = 'wedding';
                } else if (buttonText.includes('reception')) {
                    eventType = 'reception';
                } else {
                    eventType = 'event';
                }

                // Update Cal.com calendar with the selected event type
                if (typeof Cal !== 'undefined') {
                    Cal('inline', {
                        elementOrSelector: '#my-cal-inline',
                        calLink: 'lucas-jensen-rlhgc8/30min',
                        config: {
                            theme: 'light',
                            layout: 'month_view',
                            prefill: {
                                eventType: eventType,
                                name: '',
                                email: '',
                                notes: `Package: ${this.closest('.pricing-card').querySelector('h3').textContent}`
                            }
                        }
                    });
                }
            }
        });
    });

    // Handle pricing button clicks for calendar integration
    document.querySelectorAll('.pricing-card .price-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || this.closest('form')) return;
            
            e.preventDefault();
            const targetSection = document.querySelector('#booking');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Get package details
                const packageCard = this.closest('.pricing-card');
                const packageName = packageCard.querySelector('h3').textContent;
                const packagePrice = packageCard.querySelector('.price-amount').textContent;
                const packageDuration = packageCard.querySelector('.price-duration').textContent;
                
                // Set the event type in the calendar based on the package
                const buttonText = this.textContent.toLowerCase();
                let eventType;
                
                if (buttonText.includes('wedding') || buttonText.includes('ceremony')) {
                    eventType = 'wedding';
                } else if (buttonText.includes('reception')) {
                    eventType = 'reception';
                } else {
                    eventType = 'event';
                }

                // Use the global calendar update function
                if (typeof window.updateCalendarEventType === 'function') {
                    const packageDetails = `${packageName} - ${packagePrice} (${packageDuration})`;
                    window.updateCalendarEventType(eventType, packageDetails);
                }
            }
        });
    });

    // Initialize pricing details modal
    const pricingDetailsModal = document.getElementById('pricingDetailsModal');
    if (pricingDetailsModal) {
        new bootstrap.Modal(pricingDetailsModal);
    }
});