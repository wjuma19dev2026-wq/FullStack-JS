import { cn } from 'cn'
import { useAuth } from '../../auth/hooks'
import { Button, InputForm, InputTextarea } from '../../components'
import { color } from '../utils'
import { useState } from 'react'

export const Formulario = ({ mostarFormulario }) => {
  const { theme } = useAuth()

  const [mascota, setMascota] = useState('')
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [fecha, setFecha] = useState(new Date())
  const [sintoma, setSintoma] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = e => {
    e.preventDefault()
    console.log({ mascota, nombre, correo, fecha, sintoma })
  }

  return (
    <aside>
      <header className="text-center">
        <h3
          style={{ textTransform: 'capitalize' }}
          className="text-2xl"
        >
          añade tus pacientes y{' '}
          <span className={color[theme]}>administrarlos.</span>
        </h3>
      </header>

      <form
        onSubmit={handleSubmit}
        noValidate
        className={cn(
          'mt-1 hidden sm:block bg-white p-3 shadow-md lg:mb-0',
          mostarFormulario ? 'block' : 'hidden',
        )}
      >
        <InputForm
          inputName="mascota"
          labelContent="mascota"
          inputPlaceholder="nombre de la mascota"
          inputType="text"
          inputValue={mascota}
          inputChange={e => setMascota(e.target.value)}
          inputBlur={() => console.log('Blur')}
          required={true}
        />

        <InputForm
          inputName="propietario"
          labelContent="nombre del propietario"
          inputPlaceholder="nombre del propietario"
          inputType="text"
          inputValue={nombre}
          inputChange={e => setNombre(e.target.value)}
          inputBlur={() => console.log('Blur')}
        />

        <InputForm
          inputName="correo"
          labelContent="correo electrónico"
          inputPlaceholder="correo electrónico del propietario"
          inputType="email"
          inputValue={correo}
          inputChange={e => setCorreo(e.target.value)}
          inputBlur={() => console.log('Blur')}
        />

        <InputForm
          inputName="fecha"
          labelContent="fecha alta"
          inputPlaceholder=""
          inputType="date"
          inputValue={fecha}
          inputChange={e => setFecha(e.target.value)}
          inputBlur={() => console.log('Blur')}
        />

        <InputTextarea
          labelContent="sintomas"
          inputName="sintoma"
          inputPlaceholder="describe los sintomas."
          required={true}
          inputValue={sintoma}
          inputChange={e => setSintoma(e.target.value)}
          // inputBlur={() => console.log('TextArea Blur')}
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
