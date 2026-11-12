import { cn } from 'cn'

const inputStyled = `text-slate-900 text-base outline-1 outline-offset-1 outline-slate-300 border w-full px-3 py-1.5 mt-2 bg-gray-50 rounded-xl placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-600/40 focus:outline-2 ocus:-outline-offset-2 focus:outline-indigo-600/40`

const Input = props => {
  const { inputType, inputName, inputPlaceholder, labelContent, inputChange } =
    props

  return (
    <>
      <label className="block uppercase text-gray-600 text-xl font-bold">
        {labelContent}
      </label>
      <input
        onChange={inputChange}
        name={inputName}
        type={inputType}
        placeholder={inputPlaceholder}
        className={cn(inputStyled)}
      />
    </>
  )
}

export default Input
