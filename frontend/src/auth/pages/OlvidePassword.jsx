/**
 * @typedef {Object} ForgotPasswordResponse
 * @property {boolean} success
 * @property {string} title
 * @property {string} message
 * @property {string} email
 */

import { Link } from 'react-router'
import { Input, Button } from '../shared'
import { useEffect, useState } from 'react'
import { Alerta } from '../../components'
import veterinarioApi from '../../api/veterinarios.api'
import { sleep } from '../../utils/sleep'

// Regex sencilla y suficiente para el 99% de los casos
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * @returns {Promise<void>}
 */
const OlvidePassword = () => {
  const [correo, setCorreo] = useState('')
  const [touched, setTouched] = useState(false)
  const [alertOpts, setAlertOpts] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const isValid = EMAIL_REGEX.test(correo)
  // Solo mostramos error si el usuario ya interactuó y hay contenido inválido
  const showError = touched && correo.length > 0 && !isValid

  useEffect(() => {
    const ocultarAlerta = setTimeout(() => {
      setShowAlert(false)
    }, 3000)

    return () => clearTimeout(ocultarAlerta)
  }, [showAlert])

  const handleSubmit = async e => {
    e.preventDefault()
    setTouched(true)
    setIsFetching(true)
    if (!isValid) return

    try {
      await sleep(3000)
      const { data: respuesta } = await veterinarioApi.post('veterinarios/forgot-password', {
        email: correo,
      })

      setIsFetching(false)

      /** @type {ForgotPasswordResponse} */
      const data = respuesta

      if (data.success) {
        setAlertOpts({
          title: data.title,
          message: data.message,
          type: 'default',
        })
        setShowAlert(true)
        console.log(alertOpts)
      }
    } catch (err) {
      setIsFetching(false)
      if (err.response.data.message === 'Invalid email or password') {
        setAlertOpts({
          title: 'Ops, algo salio mal',
          message: 'El correo electrónico no existe',
          type: 'error',
        })
        setShowAlert(true)
      }
    }
  }

  return (
    <>
      <div className="p-5 mb-10 md:mb-0">
        <h1 className="text-indigo-600 font-black text-5xl text-center md:text-left">
          recupera tu acceso y no pierdas{' '}
          <span className="text-black font-extrabold text-6xl">tus pacientes</span>
        </h1>
      </div>
      <div className="p-5 grid content-center m-5 sm:m-0 lg:p-10 px-5 bg-white shadow-lg rounded-xl">
        {showAlert && (
          <div className="mb-5">
            <Alerta alertaOptions={alertOpts} />
          </div>
        )}

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
              inputPlaceholder="Ingresa un correo electrónico valido."
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

          <Button
            isFetching={isFetching}
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
