const uploadAvatar = (formData, id, token) => {
  return fetch(
    'https://eadromania-back.herokuapp.com/api/users/' + id + '/upload/avatar',
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
