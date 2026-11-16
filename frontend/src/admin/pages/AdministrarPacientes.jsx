// @ts-check

import { Formulario, ListadoPacientes } from '../components'

const AdministrarPacientes = () => {
  return (
    <>
      <div className="grid sm:grid-cols-[250px_1fr]  grid-flow-row gap-4 mt-5">
        <div>
          <Formulario />
        </div>
        <div>
          <ListadoPacientes />
        </div>
      </div>
    </>
  )
}

export default AdministrarPacientes
