// Lightbox functionality with improved image handling and accessibility
document.addEventListener('DOMContentLoaded', function() {
    const lightboxModal = new bootstrap.Modal(document.getElementById('lightboxModal'));
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');

    document.querySelectorAll('.gallery-image').forEach(function(el) {
        el.addEventListener('click', function(e) {
            const img = el.querySelector('img');
            const caption = el.querySelector('.gallery-caption').textContent;
            
            // Set alt text and caption
            lightboxImage.alt = img.alt;
            lightboxCaption.textContent = caption;
            
            // Preload image before showing modal
            const tempImage = new Image();
            tempImage.onload = function() {
                lightboxImage.src = img.src;
                lightboxModal.show();
            };
            tempImage.src = img.src;
        });
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightboxModal._isShown) {
            lightboxModal.hide();
        }
    });
});