import { create } from 'axios'

const veterinarioApi = create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
})

export default veterinarioApi
