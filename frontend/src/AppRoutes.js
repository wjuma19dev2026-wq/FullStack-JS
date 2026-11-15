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
import { ProtectedRoutes } from './admin/layouts/ProtectedRoutes'
import { AdministrarPacientes, Me } from './admin/pages'

/**
 Nota: los `loader` de rutas padre **se ejecutan para todas las rutas hijas**. Eso significa que `/admin`, `/admin/pacientes/:id` y cualquier otra ruta bajo `/admin` quedan protegidas automáticamente con una sola declaración. 👌
 */
import { authLoader } from './loaders'

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
  {
    path: '/admin',
    Component: ProtectedRoutes,
    loader: authLoader,
    children: [
      {
        index: true,
        Component: AdministrarPacientes,
      },
      {
        path: 'me',
        Component: Me,
      },
    ],
  },
])

export default router
