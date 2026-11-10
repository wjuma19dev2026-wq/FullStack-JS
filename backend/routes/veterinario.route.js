import { Router } from 'express'
import {
  getProfile,
  getVeterinarios,
  postProfile,
  postVeterinarios,
  confirmar,
  login,
} from '../controllers/veterinario.controller.js'
const router = Router()

router.get('/', getVeterinarios)

router.post('/', postVeterinarios)

router.post('/login', login)

router.get('/confirmar/:token', confirmar)

router.get('/profile', getProfile)

router.post('/profile', postProfile)

router.get('/login', login)

export default router
