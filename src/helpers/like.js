const like = (id, token) => {
  return fetch(
    `https://groupomaedromaback.herokuapp.com/api/posts/${id}/like`,
    {
      method: 'POST',
      headers: {
        authorization: token,
      },
    }
  )
}

export { like }
