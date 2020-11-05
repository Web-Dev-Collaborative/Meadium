// const { body } = require("express-validator")

window.addEventListener("load", (event) => {
    let ratingContainer = document.getElementById("rating-container")
    ratingContainer.addEventListener("click", async (e) => {
        if (e.target.id.includes('|')) {
            const valueInfo = e.target.id.split("|")
            const rating = valueInfo[0]
            const userId = valueInfo[1]
            const storyId = valueInfo[2]
            const data = { rating: rating, userId: userId, storyId: storyId }
            let avgRating = fetch(`http://localhost:8010/stories/${storyId}/cheers`, {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(fetch(`http://localhost:8010/stories/${storyId}/avgRating`))
                // .then(response => response.json())
                .then(data => console.log(data));
            console.log(avgRating)
            let ratingEle = document.getElementById("rating")
            // ratingEle.innerHTML = parseInt(avgRating)
        }
        e.preventDefault()
    })
})
