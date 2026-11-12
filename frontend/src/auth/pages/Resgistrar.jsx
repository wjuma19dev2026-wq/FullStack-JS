import { Link } from 'react-router'
import { Input, InputButton } from '../shared'
import { useState } from 'react'
import Alerta from '../../components/Alerta'

const Resgistrar = () => {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [alertaOptions, setAlertaOptions] = useState({})

  const handleSubmit = e => {
    e.preventDefault()
    if ([correo, nombre, password, passwordRepeat].includes('')) {
      setAlertaOptions({
        message: 'Todos los campos son obligatorios!.',
        type: 'error',
      })
      return
    }

    if (password !== passwordRepeat) {
      setAlertaOptions({
        message: 'Tu contraseña son diferentes!.',
        type: 'error',
      })
      return
    }

    if (password.length < 6) {
      setAlertaOptions({
        message: 'La contraseña es muy corta, agrega minimo 6 caracteres!.',
        type: 'error',
      })
      return
    }

    setAlertaOptions({})

    //- Crear el veterinario en la API
    console.log('Formulario enviado con exito!.')
  }

  return (
    <>
      <div className="p-5">
        <h1 className="text-indigo-600 font-black text-5xl text-center md:text-left">
          Crea tu cuenta y administra{' '}
          <span className="text-black font-extrabold text-6xl">
            tus pacientes
          </span>
        </h1>
      </div>
      <div className="p-5 m-5 sm:m-0 lg:p-10 px-5 bg-white shadow-lg rounded-xl">
        {alertaOptions.message && (
          <div className="mb-5">
            <Alerta alertaOptions={alertaOptions} />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <Input
              inputChange={e => setNombre(e.target.value)}
              inputName="nombre"
              inputType="text"
              inputPlaceholder="tu nombre"
              labelContent="nombre"
            />
          </div>
          <div className="mb-5">
            <Input
              inputChange={e => setCorreo(e.target.value)}
              inputName="correo"
              inputType="email"
              inputPlaceholder="tu correo electrónico"
              labelContent="Correo electrónico"
            />
          </div>
          <div className="mb-5">
            <Input
              inputChange={e => setPassword(e.target.value)}
              inputName="password"
              inputType="password"
              inputPlaceholder="tu contraseña"
              labelContent="tu contraseña"
            />
          </div>
          <div className="mb-5">
            <Input
              inputChange={e => setPasswordRepeat(e.target.value)}
              inputName="password_repeat"
              inputType="password"
              inputPlaceholder="confirma la contraseña"
              labelContent="confirmar contraseña"
            />
          </div>
          <InputButton
            btnType="submit"
            btnValue="crear cuenta"
            btnDisabled={false}
          />
        </form>

        <nav className="mt-10 md:mt-5 md:flex md:justify-between">
          <span className="block text-center my-3 md:my-0 text-gray-500">
            ¿Ya tienes una cuenta?
            <Link
              to="/"
              className="text-indigo-500 font-extrabold"
            >
              {' '}
              Iniciar Sesión
            </Link>
          </span>
        </nav>
      </div>
    </>
  )
}

export default Resgistrar
