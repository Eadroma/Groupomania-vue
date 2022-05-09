const getUser = id => {
  return fetch('https://eadromania-back.herokuapp.com/api/users/' + id).then(
    r => (r.status == 201 ? r.json() : null)
  )
}

export { getUser }
