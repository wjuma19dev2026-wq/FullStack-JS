/** @typedef { import('../auth/types/auth.type').AuthProvider } AuthProvider */
/** @typedef { import('../auth/types/auth.type').UserState } UserState */

/** @typedef {'indigo'|'lime'|'suchsia'|'rose'|'mauve'|'neutral'|'stone'|'red'|'amber'|'sky'} Theme */

import { createContext, useCallback, useEffect, useState } from 'react'
import { clearSession, verifySession } from '../libs/session'

const AuthContext = createContext()

/** @type {UserState|null} Valores iniciales del usuraio */
const userState = null

/**
 * Valor por defecto del theme
 * @type {Theme}
 */
const defaultTheme = 'mauve'

/** @param { AuthProvider } */
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userState)
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    verifySession().then(user => {
      setUser(user ?? null)
      setIsLoading(false)
    })
  }, [])

  const logout = useCallback(() => {
    clearSession() // 🔑 mismo módulo
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        isAuthenticated: !!user,
        logout,
        theme,
        setTheme,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
export default AuthContext
