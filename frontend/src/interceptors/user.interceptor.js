// @ts-nocheck
/** @typedef {import('../auth/types/auth.type').UserState} UserState */

/**
 * @typedef {Object} Props
 * @property {UserState|null} userState
 * @property {(user: UserState|null) => void} setUser
 */

/** @typedef { import('axios').AxiosError } AxiosError */

/**
 * @typedef {import('../auth/types/auth.type.js').AuthHeaders} AuthHeaders
 */

import { useNavigate } from 'react-router'
import { httpClient } from '../api/veterinarios.api'

/**
 * @param {Props} props
 * @return {Promise<void>} El usuario esta autenticado
 */
export const userInterceptor = async ({ setUser, userState }) => {
  // localStorage token
  const token = localStorage.getItem('apv_token')
  if (!token) {
    setUser(null)
    return false
  }

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

  // Peticion http al servidor para validar el token ubicado en el localStorage
  try {
    const data = await httpClient.obtenerPerfil(config)
    setUser(data)
  } catch (
    /** @type {AxiosError<{ message?: string }>} */
    err
  ) {
    console.log(err.response)
  }
}

export default userInterceptor
