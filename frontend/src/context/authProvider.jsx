import { createContext, useState } from 'react'

const AuthContext = createContext()

/**
 * Proveedor del contexto de autenticación.
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.children] Contenido que tendrá acceso al contexto.
 * @returns {JSX.Element} Componente proveedor del contexto de autenticación.
 */
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({})

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export { AuthProvider }
export default AuthContext
