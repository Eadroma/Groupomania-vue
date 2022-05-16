const checkToken = token => {
  return fetch(`https://groupomaedromaback.herokuapp.com/api/users/me`, {
    method: 'GET',
    headers: {
      authorization: token,
    },
  })
}

export { checkToken }
