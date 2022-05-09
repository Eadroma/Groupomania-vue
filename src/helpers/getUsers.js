const getUsers = () => {
  return fetch('https://eadromania-back.herokuapp.com/api/users', {
    method: 'GET',
  }).then(r => (r.status == 201 ? r.json() : null))
}

export { getUsers }
