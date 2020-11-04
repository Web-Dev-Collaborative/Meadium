window.addEventListener('load', () => {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search');

    searchBtn.addEventListener('click', () => {
        searchInput.classList.add('search-clicked');
        searchInput.focus();
    })
})
