import { cn } from 'cn'
import { useAuth } from '../auth/hooks'
import {
  activeBg700,
  bg600,
  focusVisibleRing200,
  hoverBg500,
} from '../admin/utils'

const btn = `inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full hover:cursor-pointer md:w-auto disabled:cursor-not-allowed disabled:opacity-50`

/**
 * @param {import('../types').ButtonFormProps} props
 * @returns {import('react').ReactNode}
 */
export const Button = ({
  btnValue = 'Enviar',
  btnType = 'button',
  btnDisabled = false,
  btnFetching = false,
}) => {
  const loading = btnFetching || btnDisabled
  const { theme } = useAuth()
  return (
    <button
      type={btnType}
      disabled={loading}
      aria-busy={loading}
      className={cn(
        btn,
        bg600[theme],
        activeBg700[theme],
        hoverBg500[theme],
        focusVisibleRing200[theme],
        'text-white shadow-sm',
        ' transition duration-200',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2',
        loading && 'cursor-not-allowed opacity-70',
      )}
    >
      {btnFetching ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          <span>Por favor, espera...</span>
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
  const loading = btnFetching || btnDisabled

  return (
    <input
      type={btnType}
      value={`${loading ? 'Por favor, espera...' : btnValue}`}
      disabled={loading}
      className={cn(
        btn,
        bg600[theme],
        activeBg700[theme],
        hoverBg500[theme],
        focusVisibleRing200[theme],
        ` text-white shadow-sm visible:outline-indigo-600
          transition duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 disabled:opacity-50 cursor-not-allowed`,
      )}
    />
  )
}
