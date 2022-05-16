const loginUser = (email, password) => {
  return fetch('https://groupomaedromaback.herokuapp.com/api/users/login', {
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

export { loginUser }
