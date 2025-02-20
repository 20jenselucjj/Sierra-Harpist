// Song filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const songSearch = document.getElementById('songSearch');
    const filterButtons = document.querySelectorAll('.song-filter button');
    const allCategories = document.querySelector('.song-category-all');
    const singleCategories = document.querySelectorAll('.song-category-single');
    
    // Category filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            if (category === 'all') {
                allCategories.style.display = '';
                singleCategories.forEach(cat => cat.style.display = 'none');
            } else {
                allCategories.style.display = 'none';
                singleCategories.forEach(cat => {
                    if (cat.getAttribute('data-category') === category) {
                        cat.style.display = '';
                    } else {
                        cat.style.display = 'none';
                    }
                });
            }
        });
    });

    // Search functionality
    if (songSearch) {
        songSearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const songItems = document.querySelectorAll('.song-list li');
            
            songItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }
});