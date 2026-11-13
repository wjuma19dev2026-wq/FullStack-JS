import { useState } from 'react'
import '../types/use-form.type'

import { sleep } from '../../utils'

/**
 * @param  { import('../types/use-form.type').UseFormOptions } options
 * @return { import('../types/use-form.type').UseFormReturn }
 */
const useFormPasswordValidation = ({ peticionHttp, url }) => {
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState(false)
  const [alertOpts, setAlertOpts] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const isValid = /^(?=.{6,})(?=[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]$).*/.test(password.trim())

  // Solo mostramos error si el usuario ya interactuó y hay contenido inválido

  const showError = touched && !isValid

  console.log(showError)

  // useEffect(() => {
  //   const ocultarAlerta = setTimeout(() => {
  //     setShowAlert(false)
  //   }, 10000)

  //   return () => clearTimeout(ocultarAlerta)
  // }, [showAlert])

  /**
   * @param { import('../types/use-form.type').FormSubmitEvent } e
   */
  const handleSubmit = async e => {
    // PreventDefault
    e.preventDefault()
    setTouched(false)
    setIsFetching(true)
    if (!isValid) return

    try {
      await sleep(3000) // Delay para mostrar spinner, se puede eliminar para production
      const data = await peticionHttp(url, { password })
      console.log(data)
      setIsFetching(false)
      setPassword('')
      setTouched(true)
      if (data.success) {
        setAlertOpts({
          title: data.title,
          message: data.message,
          type: 'success',
        })
        setShowAlert(true)
      }
    } catch (err) {
      // console.log(err.response)
      if (!err.response) {
        console.log('Hubo un error, statusCode 500')
        return
      }
      const { status } = err.response
      setIsFetching(false)

      // Error del servidor y/o axios response 404
      if (status === 404) {
        setAlertOpts({
          title: 'Ops, algo salio mal',
          message: 'No se pudo completar la solicitud, vuelve a intentarlo.',
          type: 'error',
        })
        setShowAlert(true)
      }

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

  return {
    password,
    touched,
    alertOpts,
    showAlert,
    isValid,
    isFetching,
    showError,
    setPassword,
    setTouched,
    setAlertOpts,
    setIsFetching,
    setShowAlert,
    handleSubmit,
  }
}

export default useFormPasswordValidation
