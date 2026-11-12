import { Link } from 'react-router'

const Login = () => {
  return (
    <>
      <div className="p-5 mb-10 md:mb-0">
        <h1 className="text-indigo-600 font-black text-5xl text-center md:text-left">
          Inicia Sesión y Administra tus{' '}
          <span className="text-black">pacientes</span>
        </h1>
      </div>
      <div className="p-5 m-5 sm:m-0 lg:p-10 px-5 bg-white shadow-lg rounded-xl">
        <form>
          <div className="mb-5">
            <label className="block uppercase text-gray-600 text-xl font-bold">
              Correo electrónico
            </label>
            <input
              type="text"
              placeholder="Correo de registro"
              className="border w-full p-3 mt-2 bg-gray-50 rounded-xl"
            />
          </div>
          <div className="mb-5">
            <label className="block uppercase text-gray-600 text-xl font-bold">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Tu Contraseña"
              className="border w-full p-3 mt-2 bg-gray-50 rounded-xl"
            />
          </div>

          <input
            type="button"
            value="Iniciar Sesión"
            className="bg-indigo-500 hover:bg-indigo-800 transition-all ease-in py-3 px-10 w-full text-white rounded-lg font-bold hover:cursor-pointer md:w-auto "
          />
        </form>

        <nav className="mt-10 md:mt-5 md:flex md:justify-between">
          <span className="block text-center my-3 md:my-0 text-gray-500">
            ¿No tienes una cuenta?
            <Link
              to="/registrar"
              className="text-indigo-500"
            >
              {' '}
              Regístrate
            </Link>
          </span>
          <span className="text-center block text-gray-500">
            <Link to="/olvide-password">Olvide mi contraseña</Link>
          </span>
        </nav>
      </div>
    </>
  )
}

export default Login
