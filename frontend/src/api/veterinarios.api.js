/**
 * @typedef {
 *    import('../auth/types/auth.type.js').AuthHeaders
 * } AuthHeaders
 */
import { create } from 'axios'
import { sleep } from '../utils'

const veterinarioApi = create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
})

const axiosClient = create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
})

class HttpClient {
  constructor() {
    this.client = axiosClient
  }

  enviarCorreoRecuperacion = async (url, data) => {
    const response = await this.client.post(url, data)
    return response.data
  }

  passwordForgotTokenVerify = async url => {
    const { data } = await this.client.get(url)
    return data
  }

  login = async data => {
    await sleep(3000)
    const response = await this.client.post('/veterinarios/login', data)
    return response.data
  }

  /**
   * @param {import('axios').AxiosRequestConfig & {
   *   headers?: import('axios').AxiosHeaders | AuthHeaders
   * }} config
   */
  obtenerPerfil = async config => {
    const { data } = await this.client.get('/veterinarios/me', config)
    return data
  }
}

export const httpClient = new HttpClient()
export default veterinarioApi
