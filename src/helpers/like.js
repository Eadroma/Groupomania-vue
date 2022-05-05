const like = id => {
  return fetch(`http://localhost:8081/api/posts/${id}/like`)
}

export { like }
