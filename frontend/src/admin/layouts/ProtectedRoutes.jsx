import { Outlet } from 'react-router'
import { useAuth } from '../../auth/hooks'
import { Footer, Header } from '../shared'

export const ProtectedRoutes = () => {
  const { isLoading, theme } = useAuth()

  if (isLoading) return <h3>Cargando ...</h3>

  return (
    <>
      <Header theme={theme ? theme : 'indigo'} />
      <div className="container  mx-auto  px-5 sm:px-0 md:px-0">
        <Outlet />
      </div>
      <Footer theme={theme ? theme : 'indigo'} />
    </>
  )
}
