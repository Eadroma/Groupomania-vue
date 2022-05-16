const getPost = id => {
  return fetch(
    'https://groupomaedromaback.herokuapp.com/api/posts/ ' + id
  ).then(r => r.json())
}

export { getPost }
