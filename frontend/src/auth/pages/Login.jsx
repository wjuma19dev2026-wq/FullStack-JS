/** @typedef { import('../types/use-form.type.js').FormSubmitEvent } FormSubmitEvent */
import { Button, Input } from '../shared'
import { AnchorLink } from '../../components'

// Hooks
import useEmailValidator from '../hooks/useEmailValidator'

const Login = () => {
  const { email, setEmail, touched, setTouched, showError, isFormValid } = useEmailValidator()

  /** @param { FormSubmitEvent } e */
  const handleSubmit = e => {
    e.preventDefault()
    console.log({ email, touched })
  }

  return (
    <>
      <div className="p-5 mb-10 md:mb-0">
        <h1 className="text-indigo-600 font-black text-5xl md:text-left">
          Inicia Sesión y Administra tus{' '}
          <span className="text-black font-extrabold text-6xl">pacientes</span>
        </h1>
      </div>
      <div className="p-5 m-5 sm:m-0 lg:p-10 px-5 bg-white shadow-lg rounded-xl">
        <form
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="mb-5">
            <Input
              showError={showError}
              inputName="correo"
              inputType="email"
              inputBlur={() => setTouched(true)}
              inputChange={e => setEmail(e.target.value)}
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
            btnDisabled={false}
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
