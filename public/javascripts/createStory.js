window.addEventListener("load", (event) => {
    let button = document.getElementById('button')
    const location = event.currentTarget.location.origin
    button.addEventListener('click', async (e) => {
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
        console.log(story)
        if (Array.isArray(story)) {
            const errorsEle = document.getElementById("errors")
            errorsEle.innerHTML = ''
            story.forEach((error) => {
                let err = document.createElement("li")
                err.innerHTML = error
                errorsEle.appendChild(err)
            })
        }
        else document.location.href = `${location}/stories/${story.story.id}`
    })
})
