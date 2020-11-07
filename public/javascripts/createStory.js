window.addEventListener("load", (event) => {
    let form = document.getElementById('form')
    const location = event.currentTarget.location.origin
    form.addEventListener('click', async (e) => {
        e.preventDefault()
        e.stopImmediatePropagation()
        const titleEle = document.getElementById('title')
        const subheaderEle = document.getElementById('subheader')
        const textEle = document.getElementById('text')
        const title = titleEle.value
        const subheader = subheaderEle.value
        const text = textEle.innerHTML
        const data = { title, subheader, body: text }
        let res = await fetch(`${location}/profile/stories/create`, {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        let story = await res.json()
        document.location.href = `${location}/stories/${story.story.id}`
    })
})
