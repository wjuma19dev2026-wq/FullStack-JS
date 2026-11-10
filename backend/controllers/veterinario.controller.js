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
    res.status(500).json({ message: error.message })
  }
}

const getVeterinarios = (req, res) => {
  res.json({ url: 'Desde API/VETERINARIOS' })
}

const confirmar = async (req, res) => {
  //- Validar Token
  const { token } = req.params
  const veterinario = await Veterinario.findOne({ token })
  if (!veterinario) {
    const error = new Error('Token no valido o ha expirado')
    return res.status(404).json({ message: error.message })
  }

  try {
    veterinario.token = null
    veterinario.confirmado = true
    await veterinario.save()
    res.json({ veterinario, message: 'Confirmando el token, espere...' })
  } catch (error) {
    console.log(error)
  }
}

const login = async (req, res) => {
  //- Exists Veterinario
  const { email } = req.body
  const veterinario = await Veterinario.findOne({ email })
  if (!veterinario) {
    return res.status(404).json({ message: "Veterinario dosn't exists" })
  }

  //- Is Active
  if (!veterinario.confirmado) {
    return res.status(404).json({ message: 'Veterinario no active' })
  }

  return res.json({ message: 'Auth ' })
}

const getProfile = (req, res) => {
  res.json({ url: 'Mostrando Perfil de Veterinario' })
}

const postProfile = (req, res) => {
  res.json({ url: 'Desde API/VETERINARIOS/PROFILE' })
}

export {
  getVeterinarios,
  postVeterinarios,
  getProfile,
  postProfile,
  confirmar,
  login,
}
