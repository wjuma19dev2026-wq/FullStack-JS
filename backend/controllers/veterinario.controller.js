import Veterinario from '../models/veterinario.model.js'
import { generateUniqueId } from '../helpers/index.js'

const postVeterinarios = async (req, res) => {
  //- User already registered
  const { email } = req.body
  const existUser = await Veterinario.findOne({ email })
  if (existUser) {
    const error = new Error('User already registered')
    return res.status(403).json({ error, message: error.message })
  }

  try {
    req.body.token = generateUniqueId()
    const veterinario = new Veterinario(req.body)
    await veterinario.save()
    res.json({ url: 'Veterinario registrado con exito.' })
  } catch (error) {
    throw new Error(error)
  }
}

const getVeterinarios = (req, res) => {
  res.json({ url: 'Desde API/VETERINARIOS' })
}

const getProfile = (req, res) => {
  res.json({ url: 'Mostrando Perfil de Veterinario' })
}

const postProfile = (req, res) => {
  res.json({ url: 'Desde API/VETERINARIOS/PROFILE' })
}

const login = (req, res) => {
  res.json({ url: 'Desde API/VETERINARIOS/LOGIN' })
}

export { getVeterinarios, postVeterinarios, login, getProfile, postProfile }
