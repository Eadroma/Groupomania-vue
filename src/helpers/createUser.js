const createUser = (email, password) => {
  return fetch('https://groupomaedromaback.herokuapp.com/api/users/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
}

export { createUser }
