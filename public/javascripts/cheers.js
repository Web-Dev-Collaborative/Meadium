window.addEventListener("load", (event) => {
    let ratingContainer = document.getElementById("rating-container")
    ratingContainer.addEventListener("click", (e) => {
        console.log(e.target.id)
    })
})
