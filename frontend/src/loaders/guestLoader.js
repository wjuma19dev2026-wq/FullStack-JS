import { redirect } from 'react-router-dom'
import { getTokenFromStorage, isTokenValid } from '../libs/session'

// 2. Evita que usuarios ya logueados entren a /login o /register
export async function guestLoader() {
  const token = getTokenFromStorage()
  if (isTokenValid(token)) {
    throw redirect('/admin')
  }
  return null
}
