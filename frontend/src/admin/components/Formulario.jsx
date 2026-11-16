import { useAuth } from '../../auth/hooks'
import { Button, InputForm, InputTextarea } from '../../components'
import { color } from '../utils'

export const Formulario = () => {
  const { theme } = useAuth()

  return (
    <aside className="bg-white p-3 shadow-md lg:mb-0">
      <header>
        <h3
          style={{ textTransform: 'capitalize' }}
          className="text-2xl"
        >
          añade tus pacientes y{' '}
          <span className={color[theme]}>administrarlos.</span>
        </h3>
      </header>

      <form className="mt-1">
        <InputForm
          inputName="nombre"
          labelContent="nombre mascota"
          inputPlaceholder="nombre de la mascota"
          inputType="text"
          inputBlur={() => console.log('Blur')}
        />

        <InputForm
          inputName="propietario"
          labelContent="nombre del propietario"
          inputPlaceholder="nombre del propietario"
          inputType="text"
          inputBlur={() => console.log('Blur')}
        />

        <InputForm
          inputName="email"
          labelContent="email propietario"
          inputPlaceholder="email propietario"
          inputType="email"
          inputBlur={() => console.log('Blur')}
        />

        <InputForm
          inputName="fecha"
          labelContent="fecha alta"
          inputPlaceholder=""
          inputType="date"
          inputBlur={() => console.log('Blur')}
        />

        <InputTextarea
          inputName="sintoma"
          inputBlur={() => console.log('TextArea Blur')}
          inputPlaceholder="describe los sintomas."
          required={true}
        />

        <Button
          btnType="submit"
          btnValue="agregar paciente"
          btnDisabled={false}
          btnFetching={false}
        />
      </form>
    </aside>
  )
}
