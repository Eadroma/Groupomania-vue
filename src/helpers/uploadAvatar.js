const uploadAvatar = (formData, id, token) => {
  return fetch(
    'https://groupomaedromaback.herokuapp.com/api/users/' +
      id +
      '/upload/avatar',
    {
      method: 'PUT',
      headers: {
        authorization: token,
      },
      body: formData,
    }
  )
}

export { uploadAvatar }
