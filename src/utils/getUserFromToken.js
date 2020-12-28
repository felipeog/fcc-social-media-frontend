import jwtDecode from 'jwt-decode'

export default (token) => {
  const decodedToken = jwtDecode(token)
  const user = {
    ...decodedToken,
    token,
  }

  return user
}
