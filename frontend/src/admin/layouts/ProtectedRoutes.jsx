import { Outlet } from 'react-router'
import { useLoaderData } from 'react-router'
import { useAuth } from '../../auth/hooks'

export const ProtectedRoutes = () => {
  const { user } = useLoaderData()
  const { isLoading } = useAuth()

  return <>{isLoading ? <h3>Cargando ...</h3> : <Outlet />}</>
}
