window.addEventListener('load', () => {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search');

    searchBtn.addEventListener('click', () => {
        if (searchInput.classList.contains('search-clicked')) {
            searchInput.classList.remove('search-clicked');
        } else {
            searchInput.classList.add('search-clicked');
            searchInput.focus();
        }
    })

    searchInput.addEventListener('input', () => {
        
    })
})
