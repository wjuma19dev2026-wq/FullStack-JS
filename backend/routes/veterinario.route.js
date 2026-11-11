import { Router } from 'express'
import {
  getProfile,
  getVeterinarios,
  postProfile,
  postVeterinarios,
  confirmar,
  login,
  forgotPassword,
  forgotPasswordTokenVerify,
  forgotPasswordChangePassword,
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
router.get('/profile', getProfile)

router.post('/profile', postProfile)

export default router
