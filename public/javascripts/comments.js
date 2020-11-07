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
    // formData.reset();
    const regex = /\w/g

    if (newComment.search(regex) === -1) return
    else {
      await fetch(`http://localhost:8010/stories/${storyId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({commenterId: userId, commentedOnId: storyId, comment: newComment })
      })

      let commentsField = document.getElementById('comments-field')
      let res = await fetch(`http://localhost:8010/stories/${storyId}/comments`)
      let comments = await res.json();
      let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      commentsField.innerHTML = ''

      for (let i = 0; i < comments.length; i++) {
        let comment = comments[i]

        let profilePicContainer = document.createElement('div')
        profilePicContainer.setAttribute('class', 'profilePic container')
        commentsField.appendChild(profilePicContainer)

        let commentPic = document.createElement('img')
        commentPic.setAttribute('class', 'profile picture')
        commentPic.setAttribute('src', `${comment.User.profilePic}`)
        profilePicContainer.appendChild(commentPic)

        let commentInfoContainer = document.createElement('div')
        commentInfoContainer.setAttribute('class', 'comment-info container')
        commentsField.appendChild(commentInfoContainer)

        let commentUserName = document.createElement('p')
        commentUserName.setAttribute('class', 'story comment user')
        commentUserName.innerHTML = `${comment.User.firstName} ${comment.User.lastName}`
        commentInfoContainer.appendChild(commentUserName)

        let commentCreatedAt = document.createElement('p')
        commentCreatedAt.setAttribute('class','story comment createdAt')
        let createdMonth = `${comment.createdAt}`.slice(5, 7) - 1
        let createdDay = `${comment.createdAt}`.slice(8, 10)
        commentCreatedAt.innerHTML = `${months[createdMonth]} ${createdDay}`
        commentInfoContainer.appendChild(commentCreatedAt)

        let commentContentContainer = document.createElement('div')
        commentContentContainer.setAttribute('class', 'comment-content container')
        commentsField.appendChild(commentContentContainer)

        let commentContent = document.createElement('div')
        commentContent.setAttribute('class', 'story-comment')
        commentContent.innerHTML = `"${comment.comment}"`
        commentContentContainer.appendChild(commentContent)
      }
    }})
  } catch (e) {
    console.log(e)
  }
})
