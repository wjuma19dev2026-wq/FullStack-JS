import { create } from 'axios'

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
    const response = await this.client.post('/veterinarios/login', data)
    return response.data
  }
}

export const httpClient = new HttpClient()
export default veterinarioApi
