import { cn } from 'cn'
const btn = `inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full hover:cursor-pointer md:w-auto disabled:cursor-not-allowed disabled:opacity-50`

const Button = () => {
  return (
    <>
      <p>Button works!</p>
    </>
  )
}

export const InputButton = props => {
  const { btnValue, btnType, btnDisabled } = props

  return (
    <input
      type={btnType}
      value={btnValue}
      disabled={btnDisabled}
      className={cn(
        btn,
        `bg-indigo-600 text-white shadow-sm visible:outline-indigo-600
         active:bg-indigo-700  hover:bg-indigo-500`,
      )}
    />
  )
}

export default Button
