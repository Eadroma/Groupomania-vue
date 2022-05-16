const getPostsWithId = id => {
  return fetch(`https://groupomaedromaback.herokuapp.com/api/users/${id}/posts`)
}

export { getPostsWithId }
