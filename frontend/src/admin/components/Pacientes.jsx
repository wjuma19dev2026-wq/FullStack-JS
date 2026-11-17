import { Button } from '@/components'
import { Paciente } from './Paciente'
import { usePaciente } from '@/hooks'

const estiloEstado = {
  padding: '6px 12px',
  borderRadius: '999px',
  fontSize: '0.8rem',
  fontWeight: '700',
  display: 'inline-block',
}

export const Pacientes = () => {
  const { pacientes } = usePaciente()

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '18px',
        }}
      >
        <h2
          style={{
            margin: 0,
            color: '#0f172a',
            fontSize: '1.6rem',
            fontWeight: '700',
          }}
        >
          Pacientes
        </h2>

        <Button
          btnType="button"
          btnValue="nuevo paciente"
        />
      </div>
      <div
        style={{
          overflow: 'hidden',
          borderRadius: '14px',
          border: '1px solid #e2e8f0',
          background: '#fff',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
          }}
        >
          <thead>
            <tr
              style={{
                background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                color: '#fff',
              }}
            >
              <th style={{ padding: '14px 10px' }}>propietario</th>
              <th style={{ padding: '14px 10px' }}>Nombre</th>
              <th style={{ padding: '14px 10px' }}>Email</th>
              <th style={{ padding: '14px 10px' }}>Fecha</th>
              <th style={{ padding: '14px 10px' }}>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {pacientes.map(paciente => (
              <Paciente
                key={paciente._id}
                paciente={paciente}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
