import { Link } from 'react-router'
import { Button, Input } from '../shared'
import { AnchorLink } from '../../components'

const Login = () => {
  return (
    <>
      <div className="p-5 mb-10 md:mb-0">
        <h1 className="text-indigo-600 font-black text-5xl md:text-left">
          Inicia Sesión y Administra tus{' '}
          <span className="text-black font-extrabold text-6xl">pacientes</span>
        </h1>
      </div>
      <div className="p-5 m-5 sm:m-0 lg:p-10 px-5 bg-white shadow-lg rounded-xl">
        <form>
          <div className="mb-5">
            <Input
              inputName="correo"
              inputType="email"
              labelContent="correo electrónico"
              inputPlaceholder="Ingresa tu correo electrónico"
              required={true}
            />
          </div>
          <div className="mb-5">
            <Input
              inputName="password"
              inputType="password"
              labelContent="contraseña"
              inputPlaceholder="Ingresa tu contraseña"
              required={true}
            />
          </div>
          <Button
            btnDisabled={true}
            btnType="submit"
            btnValue="iniciar sesión"
            isFetching={false}
          />
        </form>

        <nav className="mt-10 md:mt-5 md:flex md:justify-between">
          <AnchorLink
            type="confirm"
            question="no tienes una cuenta"
            action="regístrate"
            href="/registrar"
          />

          <AnchorLink
            type="alert"
            href="/olvide-password"
            action="olvide mi contraseña"
          />
        </nav>
      </div>
    </>
  )
}

export default Login
