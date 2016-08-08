import Auth0Lock from 'auth0-lock'

const clientId = ''
const domain = ''

export const lock = new Auth0Lock(clientId, domain)

export const isAuthenticated = () => !!localStorage.getItem('id_token')

export const getUserName = () => {
  return isAuthenticated()
    ? JSON.parse(localStorage['profile']).name
    : ''
}

export const setToken = (authResult, profile) => {
  localStorage.setItem('id_token', authResult.idToken)
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const removeToken = () => {
  localStorage.removeItem('id_token')
  localStorage.removeItem('profile')
}
