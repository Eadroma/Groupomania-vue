const getPosts = () => {
  return fetch('https://groupomaedromaback.herokuapp.com/api/posts').then(r =>
    r.status == 201 ? r.json() : null
  )
}

export { getPosts }
