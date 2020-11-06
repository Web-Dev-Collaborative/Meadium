window.addEventListener("load", (event) => {
  const commentButton = document.getElementById('comment-button')
  const commentForm = document.getElementById('comment-field')
  try {
  commentButton.addEventListener('click', async (e) => {
    e.preventDefault()
    const ids = e.target.value.split('|')
    let [userId, storyId] = ids
    let formData = new FormData(commentForm)
    let newComment = formData.get('comment')
    const regex = /\w/g

    if (newComment.search(regex) === -1) return
    else {
      await fetch(`http://localhost:8010/stories/${storyId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({commenterId: userId, commentedOnId: storyId, comment: newComment})
      })

      let commentsField = document.getElementById('comments-field')
      let res = await fetch(`http://localhost:8010/stories/${storyId}/comments`)
      let comments = await res.json();
      commentsField.innerHTML = ''

      for (let i = comments.length - 1; i >= 0; i--) {
        let comment = comments[i]
        let commentDiv = document.createElement('div')
        let commentPic = document.createElement('img')
        commentPic.setAttribute('src', `${comment.User.profilePic}`)
        commentPic.setAttribute('class', 'profile picture')
        commentDiv.innerHTML = `"${comment.comment}"`
        commentsField.appendChild(commentPic)
        commentsField.appendChild(commentDiv)
      }
    }})
  } catch (e) {
    console.log(e)
  }
})
