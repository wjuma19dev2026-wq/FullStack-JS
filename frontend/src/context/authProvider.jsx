/** @typedef { import('../auth/types/auth.type').AuthProvider } AuthProvider */
/** @typedef { import('../auth/types/auth.type').UserState } UserState */

/** @typedef {'indigo'|'lime'|'suchsia'|'rose'|'mauve'|'neutral'|'stone'|'red'|'amber'|'sky'} Theme */

import { createContext, useEffect, useState } from 'react'
import { verifySession } from '../libs/session'

const AuthContext = createContext()

/** @type {UserState|null} Valores iniciales del usuraio */
const userState = null

/**
 * Valor por defecto del theme
 * @type {Theme}
 */
const defaultTheme = 'sky'

/** @param { AuthProvider } */
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userState)
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState(defaultTheme)

  let mounted = true

  useEffect(() => {
    if (!mounted) return
    verifySession().then(user => {
      setUser(user ?? null)
      setIsLoading(false)
    })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoading, isAuthenticated: !!user, theme }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
export default AuthContext
