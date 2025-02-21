import config from './config.js';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form form');
    if (form) {
        // Set the access key from config
        const accessKeyInput = form.querySelector('input[name="access_key"]');
        if (accessKeyInput) {
            accessKeyInput.value = config.web3forms.access_key;
        }

        // Initialize success modal with specific options
        const successModalElement = document.getElementById('successModal');
        const successModal = successModalElement ? new bootstrap.Modal(successModalElement, {
            backdrop: true,
            keyboard: true,
            focus: true
        }) : null;

        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]');
            const buttonText = submitButton.querySelector('.button-text');
            const spinner = submitButton.querySelector('.spinner-border');
            
            if (!form.checkValidity()) {
                event.stopPropagation();
                form.classList.add('was-validated');
                return;
            }
            
            try {
                // Update button state
                submitButton.disabled = true;
                buttonText.textContent = 'Sending...';
                spinner.style.display = 'inline-block';
                
                // Submit the form using Web3Forms
                const formData = new FormData(form);
                
                // Add event type to subject
                const eventType = formData.get('eventType');
                const subject = `New ${eventType} Inquiry - Southern Utah Harpist`;
                formData.set('subject', subject);

                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Show success modal
                    if (successModal) {
                        successModal.show();
                        
                        // Auto-hide modal after 3 seconds
                        setTimeout(() => {
                            successModal.hide();
                        }, 3000);
                    }
                    
                    // Reset form
                    form.reset();
                    form.classList.remove('was-validated');
                } else {
                    throw new Error(data.message || 'Submission failed');
                }
            } catch (error) {
                console.error('Submission error:', error);
                alert('Sorry, there was a problem sending your message. Please try again later.');
            } finally {
                // Reset button state
                submitButton.disabled = false;
                buttonText.textContent = 'Send Message';
                spinner.style.display = 'none';
            }
        });

        // Clear form validation state when inputs change
        form.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', () => {
                if (form.classList.contains('was-validated')) {
                    input.classList.remove('is-invalid');
                    if (input.checkValidity()) {
                        input.classList.add('is-valid');
                    }
                }
            });
        });
    }

    // Update copyright year dynamically
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});