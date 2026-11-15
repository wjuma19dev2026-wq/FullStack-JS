/** @typedef { import('../auth/types/auth.type').AuthProvider } AuthProvider */
/** @typedef { import('../auth/types/auth.type').UserState } UserState */

import { createContext, useEffect, useState } from 'react'
import { verifySession } from '../libs/session'

const AuthContext = createContext()

/** @type {UserState|null} Valores iniciales del usuraio */
const userState = null

/** @param { AuthProvider } */
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userState)
  const [isLoading, setIsLoading] = useState(true)

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
      value={{ user, setUser, isLoading, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
export default AuthContext
