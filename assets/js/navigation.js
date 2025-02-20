// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .footer-links a, .price-button, .btn-outline-primary[href="#contact"]');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const bsCollapse = navbarCollapse ? new bootstrap.Collapse(navbarCollapse, {toggle: false}) : null;
    
    // Handle navigation click events
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Handle mobile menu collapse
            if (navbarCollapse?.classList.contains('show')) {
                bsCollapse?.hide();
            }
            
            // Handle smooth scroll with offset
            const href = link.getAttribute('href');
            if (href?.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const extraOffset = 20; // Additional offset for better positioning
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - extraOffset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Handle header scroll state
    const header = document.querySelector('header');
    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
            }
            lastScroll = currentScroll;
        });
    }
});