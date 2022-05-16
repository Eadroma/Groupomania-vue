const addComment = (postId, token, commentContent) => {
  return fetch(
    `https://groupomaedromaback.herokuapp.com/api/posts/${postId}/comment`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({
        comment: commentContent,
      }),
    }
  )
}

export { addComment }
