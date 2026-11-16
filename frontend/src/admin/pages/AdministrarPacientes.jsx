// @ts-check

import { useState } from 'react'
import { Button } from '../../components'
import { Formulario, ListadoPacientes } from '../components'

const AdministrarPacientes = () => {
  const [mostarFormulario, setMostrarFormulario] = useState(false)

  return (
    <>
      <div className="mt-5 sm:hidden">
        <Button
          btnDisabled={false}
          btnFetching={false}
          btnType="button"
          btnValue={
            mostarFormulario ? 'ocultar formulario' : 'mostrar formulario'
          }
          queryFn={() => setMostrarFormulario(!mostarFormulario)}
        />
      </div>
      <div className="grid sm:grid-cols-[250px_1fr]  grid-flow-row gap-4 mt-5">
        <div>
          <Formulario mostarFormulario={mostarFormulario} />
        </div>
        <div>
          <ListadoPacientes />
        </div>
      </div>
    </>
  )
}

export default AdministrarPacientes
