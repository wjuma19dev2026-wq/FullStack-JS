import { Outlet } from 'react-router'

export const AuthLayout = () => {
  return (
    <>
      <div className="container mx-auto md:grid md:grid-cols-2 content-center min-h-screen">
        <Outlet />
      </div>
    </>
  )
}
