import { Router } from 'express'
import { isAuth } from '../middlewares/index.js'

import {
  actualizarPaciente,
  eliminarPaciente,
  obtenerPaciente,
  obtenerPacientes,
  registrarPaciente,
} from '../controllers/paciente.controller.js'

const router = Router()

router.route('/').get([isAuth], obtenerPacientes).post([isAuth], registrarPaciente)

router
  .route('/:pacienteId')
  .get([isAuth], obtenerPaciente)
  .patch([isAuth], actualizarPaciente)
  .delete([isAuth], eliminarPaciente)

export default router
