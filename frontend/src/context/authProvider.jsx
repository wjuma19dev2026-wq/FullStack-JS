/** @typedef { import('../auth/types/auth.type').AuthProvider } AuthProvider */
/** @typedef { import('../auth/types/auth.type').UserState } UserState */

import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { userInterceptor } from '../interceptors'

const AuthContext = createContext()

/** @type {UserState|null} Valores iniciales del usuraio */
const userState = null

/** @param { AuthProvider } */
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userState)

  useEffect(() => {
    const autenticarUsuario = async () => {
      // If isAuth setter user=user other case user=null
      await userInterceptor({ userState, setUser })
    }
    autenticarUsuario()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
export default AuthContext
