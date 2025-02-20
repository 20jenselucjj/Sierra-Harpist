// Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.image-placeholder').forEach(function(el) {
        el.addEventListener('click', function(e) {
            const imgSrc = el.getAttribute('data-img');
            const caption = el.getAttribute('data-caption');
            document.getElementById('lightbox-image').src = imgSrc;
            document.getElementById('lightbox-caption').textContent = caption;
        });
    });
});