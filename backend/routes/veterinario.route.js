import { Router } from 'express'
import {
  getVeterinarios,
  postVeterinarios,
  confirmar,
  login,
  forgotPassword,
  forgotPasswordTokenVerify,
  forgotPasswordChangePassword,
  obtenerPerfil,
  perfil,
} from '../controllers/veterinario.controller.js'
import { isAuth } from '../middlewares/index.js'
const router = Router()

//- Public Routes
router.get('/', isAuth, getVeterinarios)
router.post('/', postVeterinarios)
router.get('/login', login)
router.post('/login', login)
router.get('/confirmar/:token', confirmar)

//- Forgot password
router.post('/forgot-password', forgotPassword)
router
  .route('/forgot-password/:token')
  .get(forgotPasswordTokenVerify)
  .post(forgotPasswordChangePassword)

//- Private Routes
router.route('/me').get([isAuth], obtenerPerfil).post([isAuth], perfil)

export default router
