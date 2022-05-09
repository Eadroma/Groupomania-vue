const deleteUser = (id, token) => {
  return fetch('https://eadromania-back.herokuapp.com/api/users/' + id, {
    method: 'DELETE',
    headers: {
      authorization: token,
    },
  })
}

export { deleteUser }
