const { body } = require("express-validator")

window.addEventListener("load", (event) => {
    let ratingContainer = document.getElementById("rating-container")
    ratingContainer.addEventListener("click", (e) => {
        // ratingContainer.submit();
        e.preventDefault()
        const valueInfo = e.target.value.split("|")
        const rating = valueInfo[0]
        const userId = valueInfo[1]
        const storyId = valueInfo[2]
        fetch(`http://localhost:8010/stories/${storyId}/cheers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rating, userId })
        })
    })
})
