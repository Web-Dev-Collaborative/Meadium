window.addEventListener("load", async () => {
    const bookmark = document.getElementById("bookmark");
    const initialURL = window.location.href
    bookmark.addEventListener("click", async () => {
        const storyId = parseInt(initialURL.split("stories/")[1])
        let res = await fetch(`/stories/${storyId}/pin`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ storyId: storyId })
        })
        if (bookmark.classList.contains("far")) {
            console.log(res)
            if (res.status === 200) {
                bookmark.classList.remove("far")
                bookmark.classList.add("fas")
            }
        }
        else if (bookmark.classList.contains("fas")) {
            console.log(res)
            if (res.status === 200) {
                bookmark.classList.remove("fas")
                bookmark.classList.add("far")
            }
        }
    })
})
