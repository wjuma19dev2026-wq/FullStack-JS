// @ts-check
/**
 * @typedef {import('../admin/types').Paciente} Paciente
 * @typedef {import('react')} React
 */
/**
 * @typedef { object } Props
 * @property { React.ReactNode } children
 */

import { httpPaciente } from '../api'
import { createContext, useEffect, useMemo, useState } from 'react'

const PacienteContext = createContext({})

/** @param {Props} props */
const PacienteProvider = ({ children }) => {
  /** @type {[Paciente[], React.Dispatch<React.SetStateAction<Paciente[]>>]} */
  const [pacientes, setPacientes] = useState([])

  useMemo(() => {
    const peticion = async () => {
      try {
        const res = await httpPaciente.obteber.pacientes('/api/pacientes')
        console.log(res)
      } catch (err) {
        console.log(err.response.data)
      }
    }
    peticion()
  }, [])

  /** @param {Paciente} paciente*/
  const agregarPaciente = async paciente => {
    try {
      const res = await httpPaciente.agregar('/api/pacientes', paciente)
      const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = res.paciente
      setPacientes(prev => [...prev, pacienteAlmacenado]) // Actualiza el state
      console.log(pacienteAlmacenado)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return (
    <PacienteContext value={{ pacientes, agregarPaciente }}>
      {children}
    </PacienteContext>
  )
}

export { PacienteProvider }
export default PacienteContext
