import { Outlet } from 'react-router'
import { useAuth } from '../../auth/hooks'
import { Footer, Header } from '../shared'

export const ProtectedRoutes = () => {
  const { isLoading, theme } = useAuth()
  return (
    <>
      <Header theme={theme ? theme : 'indigo'} />
      {isLoading ? <h3>Cargando ...</h3> : <Outlet />}
      <Footer theme={theme ? theme : 'indigo'} />
    </>
  )
}
