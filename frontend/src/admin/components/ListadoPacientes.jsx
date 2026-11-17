import { useAuth } from '@/auth/hooks'
import { color } from '../utils'
import { cn } from 'cn'
import { Pacientes } from './Pacientes'

export const ListadoPacientes = () => {
  const { theme } = useAuth()
  console.log(theme)
  return (
    <main>
      <header className="text-center">
        <h2
          style={{ textTransform: 'capitalize' }}
          className="text-4xl"
        >
          listado de pacientes
        </h2>
        <p
          className="text-2xl"
          style={{ textTransform: 'capitalize' }}
        >
          administra tus{' '}
          <span className={cn(color[theme], `font-extrabold text-3xl`)}>
            pacientes y citas
          </span>
        </p>
      </header>
      <section className="mt-5">
        <Pacientes />
      </section>
    </main>
  )
}
