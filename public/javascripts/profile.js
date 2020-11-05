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

    searchInput.addEventListener('input', async (e) => {
        const title = e.target.value;
        const data = { title: title };
        try {
            const res = await fetch('http://localhost:8010/profile/search', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const dataJSON = await res.json();
            console.log(dataJSON);
            console.log('hi from fetch')
        } catch(e) {
            console.log(e);
        }
    })
})
