const deleteUser = (id, token) => {
  return fetch('https://groupomaedromaback.herokuapp.com/api/users/' + id, {
    method: 'DELETE',
    headers: {
      authorization: token,
    },
  })
}

export { deleteUser }
