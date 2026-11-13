import { useEffect, useState } from 'react'
import '../types/use-form.type'

import { sleep, EMAIL_REGEX } from '../../utils'

/**
 * @param  { import('../types/use-form.type').UseFormOptions } options
 * @return { import('../types/use-form.type').UseFormReturn }
 */
const useForm = ({ peticionHttp, url }) => {
  const [correo, setCorreo] = useState('')
  const [touched, setTouched] = useState(false)
  const [alertOpts, setAlertOpts] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const isValid = EMAIL_REGEX.test(correo)

  // NOTA
  // Solo mostramos error si el usuario ya interactuó y hay contenido inválido
  const showError = touched && correo.length > 0 && !isValid

  useEffect(() => {
    const ocultarAlerta = setTimeout(() => {
      setShowAlert(false)
    }, 10000)

    return () => clearTimeout(ocultarAlerta)
  }, [showAlert])

  /**
   * @param { import('../types/use-form.type').FormSubmitEvent } e
   */
  const handleSubmit = async e => {
    // PreventDefault
    e.preventDefault()
    setTouched(true)
    setIsFetching(true)
    if (!isValid) return

    try {
      await sleep(3000) // Delay para mostrar spinner, se puede eliminar para production
      const data = await peticionHttp(url, correo)
      console.log(data)
      setIsFetching(false)

      if (data.success) {
        setAlertOpts({
          title: data.title,
          message: data.message,
          type: 'default',
        })
        setShowAlert(true)
      }
    } catch (err) {
      // console.log(err.response)
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
    correo,
    touched,
    alertOpts,
    showAlert,
    isValid,
    isFetching,
    showError,
    setCorreo,
    setTouched,
    setAlertOpts,
    setIsFetching,
    setShowAlert,
    handleSubmit,
  }
}

export default useForm
