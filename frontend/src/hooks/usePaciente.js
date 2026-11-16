/**  @typedef {import('../admin/types').Paciente} Paciente */

/**
 * @typedef {(paciente: Paciente) => void} AgregarPaciente
 */

/**
 * @typedef { object } UsePaciente
 * @property {Paciente[]} pacientes
 * @property {AgregarPaciente} agregarPaciente
 */

import { PacienteContext } from '@/context'
import { useContext } from 'react'

/**
 * Manejo de pacientes de veterinarios
 * @returns {UsePaciente}
 */
export const usePaciente = () => {
  const context = useContext(PacienteContext)

  if (!context) {
    throw new Error('usePaciente debe usarse dentro de un PacienteProvider')
  }

  return context
}
