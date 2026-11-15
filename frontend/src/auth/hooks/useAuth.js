import { useContext } from 'react'
import { AuthContext } from '../../context'

/**
 * @return {{
        user: object,
        setUser: object,
        isLoading: boolean,
        isAuthenticated: boolean,
        logout: MouseEventHandle<HTMLButtonElement>,
        theme: string,
        setTheme: object,
 }} Devuelve el AuthContect
 */
const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return context
}

export default useAuth
