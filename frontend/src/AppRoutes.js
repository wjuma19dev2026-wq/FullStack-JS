import { createBrowserRouter } from 'react-router'

//- Layouts
import { AuthLayout } from './auth/layout/AuthLayout'

//- Pages
import {
  ConfirmarCuenta,
  Login,
  NuevaPassword,
  OlvidePassword,
  Resgistrar,
} from './auth/pages'

const router = createBrowserRouter([
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        index: true,
        Component: Login,
      },
      {
        path: 'confirmar-cuenta/:token',
        Component: ConfirmarCuenta,
      },
      {
        path: 'registrar',
        Component: Resgistrar,
      },
      {
        path: 'olvide-password',
        Component: OlvidePassword,
      },
      {
        path: 'olvide-password/:token',
        Component: NuevaPassword,
      },
    ],
  },
])

export default router
