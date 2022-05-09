const getPosts = () => {
  return fetch('https://eadromania-back.herokuapp.com/api/posts').then(r =>
    r.status == 201 ? r.json() : null
  )
}

export { getPosts }
