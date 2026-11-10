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

//- Public Routes
router.get('/', getVeterinarios)

router.post('/', postVeterinarios)

router.get('/login', login)

router.post('/login', login)

router.get('/confirmar/:token', confirmar)

//- Private Routes
router.get('/profile', getProfile)

router.post('/profile', postProfile)

export default router
