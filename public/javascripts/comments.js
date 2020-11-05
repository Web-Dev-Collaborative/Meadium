// window.addEventListener("load", (event) => {
//   const commentButton = document.getElementById('comment-button')
//   try {
//   commentButton.addEventListener('click', async (e) => {
//     e.preventDefault()
//     const ids = e.target.value.split('|')
//     const [userId, storyId] = ids

//     const res = await fetch(`http://localhost:8010/stories/${storyId}/comments`, {
//       method: 'post',
//       headers:
//     })

//     const resJson = await res.json()
//     console.log(resJson)
//   })
//   } catch (e) {
//     console.log(e)
//   }
// })
