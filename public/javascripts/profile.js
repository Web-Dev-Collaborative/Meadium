window.addEventListener('load', (e) => {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search');
    const location = e.currentTarget.location.origin
    const userid = e.currentTarget.location.pathname.split('/')[2];
    if (searchBtn) searchBtn.addEventListener('click', () => {
        if (searchInput.classList.contains('search-clicked')) {
            searchInput.classList.remove('search-clicked');
        } else {
            searchInput.classList.add('search-clicked');
            searchInput.focus();
        }
    })

    if (searchInput) searchInput.addEventListener('input', async (e) => {
        const title = e.target.value;
        const data = { title: title, id: userid };
        try {
            const res = await fetch(`${location}/api/search`, {
                method: "PUT",
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify(data)
            });
            const stories = await res.json();
            const storyContainer = document.querySelector('.storyContainer');
            const container = document.createElement('ul');
            container.classList.add('stories')
            stories.forEach(story => {
                const list = document.createElement('li');
                list.classList.add('story')
                const storyItems = document.createElement('div')
                storyItems.classList.add('storyItems');
                const link = document.createElement('a');
                link.href = `/stories/${story.id}`;
                const img = document.createElement('img');
                img.src = `${story.imgPath}`;
                const h1Ele = document.createElement('h1')
                h1Ele.classList.add('title');
                h1Ele.innerHTML = story.title;
                const para = document.createElement('p')
                para.classList.add('body');
                para.innerHTML = story.body;
                storyContainer.innerHTML = '';
                storyItems.appendChild(img);
                storyItems.appendChild(h1Ele);
                storyItems.appendChild(para);
                list.appendChild(link);
                list.appendChild(storyItems);
                container.appendChild(list);
            });
            const header = document.createElement('h1')
            header.innerText = 'Created Stories:'
            storyContainer.appendChild(header);
            storyContainer.appendChild(container)
        } catch (e) {
            console.log(e);
        }
    })
})
