/**  @typedef {import('../admin/types').Paciente} Paciente */

/**
 * @typedef {(paciente: Paciente) => void} Agregar
 * @typedef {(paciente: Paciente) => void} Editar
 * @typedef {(paciente: Paciente) => void} PacienteSelected
 */

/**
 * @typedef { object } UsePaciente
 * @property {Paciente[]} pacientes
 * @property {Agregar} agregar
 * @property {Editar} editar
 * @property {Paciente} paciente
 * @property {PacienteSelected} pacienteSelected
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
