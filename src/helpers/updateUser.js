const updateUser = (objectForm, id, token) => {
  return fetch('https://eadromania-back.herokuapp.com/api/users/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(objectForm),
  })
}

export { updateUser }
