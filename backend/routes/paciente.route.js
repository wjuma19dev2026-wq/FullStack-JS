import { Router } from 'express'
import { todosLosPacientes } from '../controllers/paciente.controller.js'

const router = Router()

router.get('/', todosLosPacientes)

export default router
