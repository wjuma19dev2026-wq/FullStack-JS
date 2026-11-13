import { cn } from 'cn'

const inputStyled = `text-slate-900 text-base outline-none outline-offset-1 outline-slate-300 border border-slate-400 w-full px-3 py-1.5 mt-2 bg-gray-50 rounded-xl placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-600/40 focus:outline-2 ocus:-outline-offset-2 focus:outline-indigo-600/40`

const Input = ({
  inputType,
  inputName,
  showError = false,
  inputValue,
  inputPlaceholder,
  labelContent,
  inputChange,
  required = false,
  inputBlur = () => console.log('Hiciste blur'),
}) => {
  return (
    <>
      <label
        htmlFor={inputName}
        className="block text-gray-600 text-xl font-bold"
      >
        {labelContent}
      </label>
      <input
        required={required}
        onChange={inputChange}
        onBlur={inputBlur}
        aria-invalid={showError}
        aria-describedby={showError ? 'email-error' : undefined}
        name={inputName}
        type={inputType}
        value={inputValue}
        placeholder={inputPlaceholder}
        className={cn(
          inputStyled,
          showError
            ? 'border-red-500 focus:ring-2 focus:ring-red-500/30'
            : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30',
        )}
      />
    </>
  )
}

export default Input
