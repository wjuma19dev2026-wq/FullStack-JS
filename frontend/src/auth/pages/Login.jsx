/** @typedef { import('../types/use-form.type.js').FormSubmitEvent } FormSubmitEvent */
import { Button, Input } from '../shared'
import { AnchorLink } from '../../components'

// Hooks
import { useEmailValidator, usePasswordValidator } from '../hooks'
import { httpClient } from '../../api'

const Login = () => {
  const { email, setEmail, setTouched, showError, isFormValid } = useEmailValidator()

  const { password, setPassword, setPasswordTouched, showPasswordError, isPasswordValid } =
    usePasswordValidator()

  /** @param { FormSubmitEvent } e */
  const handleSubmit = async e => {
    e.preventDefault()
    if ([email, password].includes('')) {
      return
    }
    console.log({ email, password })
    try {
      const data = await httpClient.login({ email, password })
      console.log(data)
    } catch (err) {
      console.log(err.response)
    }
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
              inputBlur={() => setTouched(true)}
              inputChange={e => setEmail(e.target.value)}
              inputValue={email}
              inputName="correo"
              inputType="email"
              labelContent="correo electrónico"
              inputPlaceholder="Ingresa tu correo electrónico"
              required={true}
            />
          </div>
          <div className="mb-5">
            <Input
              showError={showPasswordError}
              inputChange={e => setPassword(e.target.value)}
              inputBlur={() => setPasswordTouched(true)}
              inputValue={password}
              inputName="password"
              inputType="password"
              labelContent="contraseña"
              inputPlaceholder="Ingresa tu contraseña"
              required={true}
            />
          </div>
          <Button
            btnDisabled={!isFormValid || !isPasswordValid}
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
