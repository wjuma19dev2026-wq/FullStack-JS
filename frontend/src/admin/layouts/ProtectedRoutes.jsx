import { Outlet } from 'react-router'
import { useAuth } from '../../auth/hooks'
import { Footer, Header } from '../shared'

export const ProtectedRoutes = () => {
  const { isLoading, theme } = useAuth()

  if (isLoading) return <h3>Cargando ...</h3>

  return (
    <>
      <Header theme={theme ? theme : 'indigo'} />
      <Outlet />
      <Footer theme={theme ? theme : 'indigo'} />
    </>
  )
}
