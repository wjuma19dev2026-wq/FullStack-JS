import { Link } from 'react-router'
import { Input, InputButton } from '../shared'
import { useEffect, useState } from 'react'

// Regex sencilla y suficiente para el 99% de los casos
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const OlvidePassword = () => {
  const [correo, setCorreo] = useState('')
  const [touched, setTouched] = useState(false)

  const isValid = EMAIL_REGEX.test(correo)
  // Solo mostramos error si el usuario ya interactuó y hay contenido inválido
  const showError = touched && correo.length > 0 && !isValid

  const handleSubmit = e => {
    e.preventDefault()
    setTouched(true)
    if (!isValid) return
    console.log('Enviando:', correo)
  }

  return (
    <>
      <div className="p-5 mb-10 md:mb-0">
        <h1 className="text-indigo-600 font-black text-5xl text-center md:text-left">
          recupera tu acceso y no pierdas{' '}
          <span className="text-black font-extrabold text-6xl">
            tus pacientes
          </span>
        </h1>
      </div>
      <div className="p-5 grid content-center m-5 sm:m-0 lg:p-10 px-5 bg-white shadow-lg rounded-xl">
        <form
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="mb-5">
            <Input
              showError={showError}
              required={true}
              inputChange={e => setCorreo(e.target.value)}
              inputName="correo"
              inputValue={correo}
              inputBlur={() => setTouched(true)}
              inputType="email"
              inputPlaceholder="tu correo electrónico"
              labelContent="Correo electrónico"
            />
            {showError && (
              <p
                id="email-error"
                className="mt-1 text-sm text-red-600"
              >
                Introduce un correo electrónico válido.
              </p>
            )}
          </div>

          <InputButton
            btnType="submit"
            btnValue="Enviar instrucciones"
            btnDisabled={!isValid}
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
          <span className="block text-center my-3 md:my-0 text-gray-500">
            ¿No tienes una cuenta?
            <Link
              to="/registrar"
              className="text-indigo-500 font-extrabold"
            >
              {' '}
              Regístrate
            </Link>
          </span>
        </nav>
      </div>
    </>
  )
}

export default OlvidePassword
