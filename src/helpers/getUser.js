const getUser = id => {
  return fetch('https://groupomaedromaback.herokuapp.com/api/users/' + id).then(
    r => (r.status == 201 ? r.json() : null)
  )
}

export { getUser }
