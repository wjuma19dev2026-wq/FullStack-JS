import { cn } from 'cn'

const Alerta = props => {
  const { title, message, type } = props.alertaOptions
  return (
    <div
      role="alert"
      className={cn(
        `rounded-xl border border-white/20 bg-gradient-to-r  p-4 text-white shadow-lg`,
        type === 'error'
          ? 'from-red-500 via-red-400 to-red-400'
          : 'from-indigo-500 via-indigo-400 to-indigo-400',
        type === 'success' && 'from-lime-500 via-lime-400 to-lime-400',
      )}
    >
      <div className="flex items-center gap-3">
        {/*<span className="text-2xl">⚠️</span>*/}
        <div>
          <p className="font-extrabold">{title}!</p>
          <p className="text-sm text-white/90">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Alerta
