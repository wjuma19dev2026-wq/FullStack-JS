import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

import { veterinariosApi } from '../../api/index'
import Alerta from '../../components/Alerta'

const ConfirmarCuenta = () => {
  const { token } = useParams()
  const [alertOpts, setAlertOpts] = useState({})
  const [confirmado, setConfirmado] = useState(false)

  useEffect(() => {
    let mounted = true
    const http = async () => {
      try {
        const url = `/veterinarios/confirmar/${token}`
        const response = await veterinariosApi.get(url)
        if (mounted) return
        setConfirmado(true)
        setAlertOpts({
          message: response.data.message,
          type: 'success',
          title: 'Enhorabuena!',
        })
      } catch (err) {
        if (mounted) return
        if (err.response) {
          setAlertOpts({
            message: err.response.data.message,
            type: 'error',
            title: 'Ops!!!',
          })
        }
      }
    }
    http()

    return () => {
      mounted = false
    }
  }, [token])

  return (
    <>
      <div className="p-5">
        <h1 className="text-indigo-600 font-black text-5xl text-center md:text-left">
          Confirma tu cuenta y comienza a administra{' '}
          <span className="text-black font-extrabold text-6xl">
            tus pacientes
          </span>
        </h1>
      </div>

      <div className="p-5">
        {!confirmado && alertOpts.message && (
          <div>
            <Alerta alertaOptions={alertOpts} />
            <span className="block  mt-5  text-gray-500">
              Vuelve a{' '}
              <Link
                to="/"
                className="text-indigo-500 hover:text-indigo-700 font-extrabold"
              >
                {' '}
                generar un token valido
              </Link>
            </span>
          </div>
        )}
        {confirmado && (
          <div>
            <Alerta alertaOptions={alertOpts} />
            <span className="block  mt-5  text-gray-500">
              Ya puedes
              <Link
                to="/"
                className="text-indigo-500 font-extrabold"
              >
                {' '}
                Iniciar Sesión
              </Link>
            </span>
          </div>
        )}
      </div>
    </>
  )
}

export default ConfirmarCuenta
