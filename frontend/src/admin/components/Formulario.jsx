/**
 * @typedef { object } Props
 * @property {boolean} mostarFormulario
 */

import { cn } from 'cn'
import { Button, InputForm, InputTextarea } from '../../components'
import { color } from '../utils'
import { useRef, useState } from 'react'

// Hooks
import { useAuth } from '../../auth/hooks'
import { usePaciente } from '@/hooks'

/** @param {Props} */
export const Formulario = ({ mostarFormulario }) => {
  const { theme } = useAuth()
  const { pacientes, agregarPaciente } = usePaciente()

  const [propietario, setPropietario] = useState('')
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintoma, setSintoma] = useState('')
  const [alerta, setAlerta] = useState({})

  /** @param {React.FormEvent<Event>} e */
  const handleSubmit = e => {
    e.preventDefault()

    const errores = {
      nombre: !nombre.trim(),
      propietario: !propietario.trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
      fecha: !fecha,
      sintoma: !sintoma.trim(),
    }

    setAlerta(errores)

    if (Object.values(errores).some(Boolean)) return

    agregarPaciente({ propietario, nombre, email, fecha, sintoma })
    setNombre('')
    setEmail('')
    setPropietario('')
    setSintoma('')
    setFecha('')
    e.target.reset()
  }

  return (
    <aside>
      <header className="text-center">
        <h3
          style={{ textTransform: 'capitalize' }}
          className="text-2xl"
        >
          añade tus pacientes y{' '}
          <span className={color[theme]}>administrarlos.</span>
        </h3>
      </header>

      <form
        onSubmit={handleSubmit}
        noValidate
        className={cn(
          'mt-1 hidden sm:block bg-white p-3 shadow-md lg:mb-0',
          mostarFormulario ? 'block' : 'hidden',
        )}
      >
        {Object.values(alerta).some(Boolean) && (
          <p
            className="mb-2 text-sm text-red-600"
            role="alert"
          >
            Completa todos los campos y escribe un correo válido.
          </p>
        )}

        <InputForm
          inputName="nombre"
          labelContent="nombre"
          inputPlaceholder="nombre de la mascota"
          inputType="text"
          inputValue={nombre}
          inputChange={e => setNombre(e.target.value)}
          showError={alerta.nombre}
          required={true}
        />

        <InputForm
          inputName="propietario"
          labelContent="nombre del propietario"
          inputPlaceholder="nombre del propietario"
          inputType="text"
          inputValue={propietario}
          inputChange={e => setPropietario(e.target.value)}
          showError={alerta.propietario}
          required={true}
        />

        <InputForm
          inputName="email"
          labelContent="correo electrónico"
          inputPlaceholder="correo electrónico del propietario"
          inputType="email"
          inputValue={email}
          inputChange={e => setEmail(e.target.value)}
          showError={alerta.email}
          required={true}
        />

        <InputForm
          inputName="fecha"
          labelContent="fecha alta"
          inputPlaceholder=""
          inputType="date"
          inputValue={fecha}
          inputChange={e => setFecha(e.target.value)}
          showError={alerta.fecha}
          required={true}
        />

        <InputTextarea
          labelContent="sintomas"
          inputName="sintoma"
          inputPlaceholder="describe los sintomas."
          required={true}
          inputValue={sintoma}
          inputChange={e => setSintoma(e.target.value)}
          showError={alerta.sintoma}
        />

        <Button
          btnType="submit"
          btnValue="agregar paciente"
          btnDisabled={false}
          btnFetching={false}
        />
      </form>
    </aside>
  )
}
