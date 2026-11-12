import { create } from 'axios'

const veterinarioApi = create({
  baseURL: 'http://localhost:4000/api',
})

export default veterinarioApi
