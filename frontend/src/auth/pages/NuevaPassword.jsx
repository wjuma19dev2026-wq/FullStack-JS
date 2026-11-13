// Core
import { useParams } from 'react-router'

// Services
import { httpClient } from '../../api/veterinarios.api'

// Shared
import { Input, Button } from '../shared'

// Hooks
import { useFormPasswordValidation } from '../hooks'

// Components
import { Alerta, AnchorLink } from '../../components'
import { useEffect, useState } from 'react'
import { cn } from 'cn'

// Reac.Component
const NuevaPassword = () => {
  // Hooks
  const [tokenIsValid, setTokenIsValid] = useState(false)

  const params = useParams()
  const { token } = params

  const {
    handleSubmit,
    showError,
    setPassword,
    password,
    setTouched,
    isFetching,
    isValid,
    showAlert,
    alertOpts,
    setShowAlert,
  } = useFormPasswordValidation({
    url: `veterinarios/forgot-password/${token}`, // URL de la peticion http al servidor para el formulario submit.
    peticionHttp: httpClient.enviarCorreoRecuperacion,
  })

  useEffect(() => {
    let mounted = true

    const tokenVerify = async () => {
      try {
        if (!mounted) return
        const data = await httpClient.passwordForgotTokenVerify(
          `/veterinarios/forgot-password/${token}`,
        )
        if (data) {
          setTokenIsValid(true)
        }
      } catch (err) {
        if (!mounted) return
        setTokenIsValid(false)
        setShowAlert(true)
        console.log(err.response)
      }
    }
    tokenVerify()

    return () => {
      mounted = false
    }
  }, [token])

  // End hooks

  return (
    <>
      <div className="p-5 mb-10 md:mb-0">
        <h1 className="text-indigo-600 font-black text-5xl text-center md:text-left">
          Reestablece tu Contraseña y no pierdas Acceso a{' '}
          <span className="text-black font-extrabold text-6xl">tus pacientes</span>
        </h1>
      </div>
      {!tokenIsValid && showAlert && (
        <div className="p-5 grid content-start grid-rows-2 gap-5">
          <div
            role="alert"
            className={cn(
              `rounded-xl border border-white/20 bg-gradient-to-r  p-4 text-white shadow-lg from-red-500 via-red-400 to-red-400`,
            )}
          >
            <div className="flex items-center gap-3">
              <div>
                <p className="font-extrabold">No autorizado!.</p>
                <p className="text-sm text-white/90">Token no valido o ha expirado..</p>
              </div>
            </div>
          </div>
          <AnchorLink
            question="vuelve a"
            action="recuperar tu acceso"
            href="/olvide-password"
          />
        </div>
      )}
      {tokenIsValid && (
        <div className="p-5 grid content-center m-5 sm:m-0 lg:p-10 px-5 bg-white shadow-lg rounded-xl">
          {showAlert && (
            <div className="mb-5">
              <Alerta alertaOptions={alertOpts} />
            </div>
          )}
          <div>
            <form
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="mb-5">
                <Input
                  showError={showError}
                  required={true}
                  inputChange={e => setPassword(e.target.value)}
                  inputName="password"
                  inputValue={password}
                  inputBlur={() => setTouched(true)}
                  inputType="password"
                  inputPlaceholder="Ingresa tu nueva contraseña"
                  labelContent="Nueva contraseña"
                />
                {showError && (
                  <div
                    id="email-error"
                    className="mt-2 text-sm text-red-600"
                  >
                    <p>Las contraseña debe tener</p>
                    <ul className="list-disc mt-2">
                      <li className="list-item">6 o mas caracteres</li>
                      <li className="list-item">la primera letra sea mayuscula</li>
                      <li className="list-item">incluya al menos un numero</li>
                      <li className="list-item">el ultimo caracter sea especial</li>
                    </ul>
                  </div>
                )}
              </div>

              <Button
                isFetching={isFetching}
                btnType="submit"
                btnValue="Enviar instrucciones"
                btnDisabled={!isValid}
              />
            </form>
          </div>
        </div>
      )}
    </>
  )
} // End Reac.Component

export default NuevaPassword
