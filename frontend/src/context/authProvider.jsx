/** @typedef { import('../auth/types/auth.type').AuthProvider } AuthProvider */

import { createContext, useState } from 'react'

const AuthContext = createContext()

const initialState = {
  _id: '1',
  nombre: 'joe doe',
  email: 'joedoe@gmail.com',
}

/** @param { AuthProvider } */
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialState)

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export { AuthProvider }
export default AuthContext
