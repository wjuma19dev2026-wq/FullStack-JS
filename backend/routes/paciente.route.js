import { Router } from 'express'
import { isAuth } from '../middlewares/index.js'

import {
  obtenerPacientes,
  registrarPaciente,
} from '../controllers/paciente.controller.js'

const router = Router()

router.route('/').get(obtenerPacientes).post([isAuth], registrarPaciente)

export default router
