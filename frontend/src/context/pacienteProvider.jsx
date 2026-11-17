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
  const [paciente, setPaciente] = useState({})

  useEffect(() => {
    const peticion = async () => {
      try {
        const data = await httpPaciente.obteber.pacientes('/api/pacientes')
        setPacientes(data)
      } catch (err) {
        console.log(err.response.data)
      }
    }
    peticion()
  }, [])

  /** @param {Paciente} paciente*/
  const agregar = async paciente => {
    try {
      const res = await httpPaciente.agregar('/api/pacientes', paciente)
      const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = res.paciente
      setPacientes(prev => [...prev, pacienteAlmacenado]) // Actualiza el state
    } catch (err) {
      console.log(err.response.data)
    }
  }

  /** @param {Paciente} paciente*/
  const editar = async paciente => {
    const { _id, ...rest } = paciente

    try {
      const pacienteActualizado = await httpPaciente.actualizar(
        `/api/pacientes/${paciente._id}`,
        rest,
      )

      // Actualizaciones Optimistas
      const pacientesActualizados = pacientes.map(p =>
        p._id === pacienteActualizado._id ? pacienteActualizado : p,
      )
      setPacientes(pacientesActualizados)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  /** @param {Paciente} paciente*/
  const pacienteSelected = paciente => {
    setPaciente(paciente)
  }

  return (
    <PacienteContext
      value={{ pacientes, agregar, editar, paciente, pacienteSelected }}
    >
      {children}
    </PacienteContext>
  )
}

export { PacienteProvider }
export default PacienteContext
