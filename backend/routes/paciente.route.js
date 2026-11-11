import { Router } from 'express'
import { isAuth } from '../middlewares/index.js'

import {
  obtenerPaciente,
  obtenerPacientes,
  registrarPaciente,
} from '../controllers/paciente.controller.js'

const router = Router()

router.route('/').get([isAuth], obtenerPacientes).post([isAuth], registrarPaciente)

router.route('/:pacienteId').get([isAuth], obtenerPaciente)

export default router
