// @ts-check

/**
 * @typedef {import('../auth/types/auth.type').UserState} UserState
 * @typedef {import('../auth/types/auth.type.js').AuthHeaders} AuthHeaders
 * @typedef { import('axios').AxiosError } AxiosError
 */

/**
 * @typedef { Object } Props
 * @property {string} token
 * @property {UserState|null} user
 */

import { httpClient } from '../api/veterinarios.api'

export const getTokenFromStorage = () => {
  return localStorage.getItem('apv_token')
}

/**
 * @param {Props}
 * @return {void} Token almacenado en el localSotrage
 */
export function setSession({
  token,
  // user
}) {
  localStorage.setItem('apv_token', token)
  // if (user) localStorage.setItem('user', JSON.stringify(user));
}

export const clearSession = () => {
  localStorage.removeItem('apv_token')
}

export const verifySession = async () => {
  const token = getTokenFromStorage()

  if (!token) return null // Si no esta almacenado el token en el localStorage, no hace la peticion http al servidor y devuelve null

  /**
   * @type {import('axios').AxiosRequestConfig & {
   *   headers?: import('axios').AxiosHeaders | AuthHeaders
   * }} config
   */
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }

  // Si el token existe, hacer peticion http al servidor para obtener perfil /veterinarios/me
  try {
    const res = await httpClient.obtenerPerfil(config)
    if (!res) {
      // Si no viene la response, remove session here!
      clearSession()
      return null
    }
    return res
  } catch (
    /** @type {any} */
    err
  ) {
    alert(err.response.data.message)
    // console.log(err.response)
    return null
  }
}

export const isTokenValid = (token = getTokenFromStorage()) => {
  if (!token) return false
  try {
    const payloadBase64 = token.split('.')[1]
    const decodedJson = atob(
      payloadBase64.replace(/-/g, '+').replace(/_/g, '/'),
    )
    const payload = JSON.parse(decodedJson)

    // exp viene en segundos, Date.now() en milisegundos
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      clearSession()
      return false
    }
    return true
  } catch (error) {
    clearSession()
    return false
  }
}
