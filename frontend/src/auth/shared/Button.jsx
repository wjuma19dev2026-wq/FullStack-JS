import { cn } from 'cn'
const btn = `inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full hover:cursor-pointer md:w-auto disabled:cursor-not-allowed disabled:opacity-50`

const Button = ({
  btnValue = 'Enviar',
  btnType = 'button',
  btnDisabled = false,
  isFetching = false,
}) => {
  const loading = isFetching || btnDisabled
  return (
    <button
      type={btnType}
      disabled={loading}
      aria-busy={loading}
      className={cn(
        btn,
        'bg-indigo-600 text-white shadow-sm',
        'active:bg-indigo-700 hover:bg-indigo-500 transition duration-200',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 focus-visible:ring-offset-2',
        loading && 'cursor-not-allowed opacity-70',
      )}
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          <span>{btnValue || 'Cargando...'}</span>
        </>
      ) : (
        btnValue
      )}
    </button>
  )
}

export const InputButton = ({
  btnValue = 'Enviar',
  btnType = 'button',
  btnDisabled = false,
  isFetching = false,
}) => {
  const loading = isFetching || btnDisabled

  return (
    <input
      type={btnType}
      value={`${loading ? 'Por favor, espera...' : btnValue}`}
      disabled={loading}
      className={cn(
        btn,
        `bg-indigo-600 text-white shadow-sm visible:outline-indigo-600
         active:bg-indigo-700  hover:bg-indigo-500 transition duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 disabled:opacity-50 cursor-not-allowed`,
      )}
    />
  )
}

export default Button
