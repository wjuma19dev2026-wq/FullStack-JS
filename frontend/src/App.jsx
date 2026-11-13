import { RouterProvider } from 'react-router'
import router from './AppRoutes'

import { AuthProvider } from './context/index'

import './App.css'

export const App = () => {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}
