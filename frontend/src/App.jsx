import { RouterProvider } from 'react-router'
import router from './AppRoutes'

import './App.css'

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
