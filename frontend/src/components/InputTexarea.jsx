// @ts-check

import { cn } from 'cn'
import { useAuth } from '../auth/hooks'
import {
  focus_border_500,
  focus_outline_600_40,
  focus_ring_500_40,
  focus_ring_600_40,
} from '../admin/utils'

const inputStyled = `text-slate-900 text-base outline-none outline-offset-1 outline-slate-300 border border-slate-400 w-full px-3 py-1.5 mt-0 bg-gray-50 rounded-xl placeholder:text-slate-400 focus:ring-2 focus:outline-2 focus:-outline-offset-2`

/**
 * @param {import('../types').InputFormProps} props
 * @returns {import('react').ReactNode}
 */
export const InputTextarea = ({
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
  const { theme } = useAuth()

  return (
    <div className="mb-2">
      <label
        style={{ textTransform: 'capitalize' }}
        htmlFor={inputName}
        className="block text-gray-600 text-lg font-bold"
      >
        {labelContent}
      </label>
      <textarea
        style={{ textTransform: 'capitalize' }}
        required={required}
        onChange={inputChange}
        onBlur={inputBlur}
        aria-invalid={showError}
        aria-describedby={showError ? `${inputName}-error` : undefined}
        name={inputName}
        type={inputType}
        value={inputValue}
        placeholder={inputPlaceholder}
        className={cn(
          inputStyled,
          focus_outline_600_40[theme],
          focus_outline_600_40[theme],
          showError
            ? 'border-red-500 focus:ring-2 focus:ring-red-500/30'
            : `border-slate-300 focus:ring-2`,
          focus_ring_500_40[theme],
          focus_border_500[theme],
        )}
      >
        {inputValue}
      </textarea>
    </div>
  )
}
