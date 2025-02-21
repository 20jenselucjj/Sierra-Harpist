// Lightbox functionality
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.image-placeholder').forEach(function(el) {
        el.addEventListener('click', function(e) {
            const imgSrc = el.getAttribute('data-img');
            const caption = el.getAttribute('data-caption');
            if (isValidUrl(imgSrc)) {
                document.getElementById('lightbox-image').src = imgSrc;
            }
            document.getElementById('lightbox-caption').textContent = caption;
        });
    });
});