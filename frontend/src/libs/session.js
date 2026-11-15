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
    console.log(err.response)
    return null
  }
}
