import { create } from 'axios'
import { sleep } from '../utils'
import { getTokenFromStorage } from '@/libs/session'

class HttpClient {
  constructor() {
    this.axiosClient = create({
      baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    })
    this.token = getTokenFromStorage()
    this.config = {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    }
  }
}

class HttpPaciente extends HttpClient {
  get obteber() {
    return {
      pacientes: async (url = '') => {
        const { data } = await this.axiosClient.get(url, this.config)
        const pacienteAlmcenado = data.map(
          /** @param {import('../admin/types').Paciente} paciente*/ paciente => {
            return {
              nombre: paciente.nombre,
              fecha: paciente.fecha,
              propietario: paciente.propietario,
              sintoma: paciente.sintoma,
              email: paciente.email,
              _id: paciente._id,
            }
          },
        )
        return pacienteAlmcenado
      },
    }
  }

  agregar = async (url = '', paciente = {}) => {
    const { data } = await this.axiosClient.post(url, paciente, this.config)
    return data
  }

  actualizar = async (url = '', paciente = {}) => {
    const { data } = await this.axiosClient.patch(url, paciente, this.config)
    return data
  }
}

const httpPaciente = new HttpPaciente()

export { httpPaciente }
