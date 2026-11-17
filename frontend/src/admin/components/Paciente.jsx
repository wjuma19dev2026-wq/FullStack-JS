import { usePaciente } from '@/hooks'
import { dateFormat } from '@/utils/dateFormat'

export const Paciente = ({ paciente }) => {
  const { pacienteSelected } = usePaciente()

  return (
    <tr
      key={paciente._id}
      style={{
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      <td style={{ padding: '14px 10px', color: '#334155' }}>
        {paciente.propietario}
      </td>
      <td
        style={{
          padding: '14px 10px',
          color: '#0f172a',
          fontWeight: '600',
        }}
      >
        {paciente.nombre}
      </td>
      <td style={{ padding: '14px 10px', color: '#475569' }}>
        {paciente.email}
      </td>
      <td style={{ padding: '14px 16px', color: '#475569' }}>
        {dateFormat(paciente.fecha)}
      </td>
      <td style={{ padding: '14px 10px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => pacienteSelected(paciente)}
            type="button"
            style={{
              background: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 12px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Editar
          </button>

          <button
            type="button"
            style={{
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 12px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  )
}
