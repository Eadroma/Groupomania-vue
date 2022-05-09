const like = (id, token) => {
  return fetch(`https://eadromania-back.herokuapp.com/api/posts/${id}/like`, {
    method: 'POST',
    headers: {
      authorization: token,
    },
  })
}

export { like }
