import { RouterProvider } from 'react-router'
import router from './AppRoutes'

import { AuthProvider, PacienteProvider } from './context/index'

import './App.css'

export const App = () => {
  return (
    <>
      <AuthProvider>
        <PacienteProvider>
          <RouterProvider router={router} />
        </PacienteProvider>
      </AuthProvider>
    </>
  )
}
