const getPost = id => {
  return fetch('https://eadromania-back.herokuapp.com/api/posts/ ' + id).then(
    r => r.json()
  )
}

export { getPost }
