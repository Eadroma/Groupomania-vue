const uploadCover = (formData, id, token) => {
  return fetch(
    'https://groupomaedromaback.herokuapp.com/api/users/' +
      id +
      '/upload/cover',
    {
      method: 'PUT',
      headers: {
        authorization: token,
      },
      body: formData,
    }
  )
}

export { uploadCover }
