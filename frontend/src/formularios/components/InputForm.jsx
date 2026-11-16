// @ts-check
import { forwardRef } from 'react'

/**
 * Props del componente {@link InputForm}.
 *
 * @typedef {object} InputFormProps
 * @property {string}  inputName
 * @property {string}  labelContent
 * @property {string}  [inputPlaceholder]
 * @property {import('react').HTMLInputTypeAttribute} [inputType='text']
 * @property {string}  [errorMessage] — Mensaje de error a mostrar.
 * @property {string}  [className]    — Clases Tailwind condicionales.
 * @property {boolean} [required]
 */

/**
 * Input de formulario con label, soporte de `ref` (forwardRef) y mensaje de error.
 *
 * El `forwardRef` es **imprescindible** para que `{...register('campo')}`
 * de react-hook-form funcione correctamente.
 *
 * @type {import('react').ForwardRefExoticComponent<
 *   InputFormProps & import('react').RefAttributes<HTMLInputElement>
 * >}
 */
export const InputForm = forwardRef(function InputForm(
  {
    inputName,
    labelContent,
    inputType = 'text',
    inputPlaceholder,
    errorMessage,
    className = '',
    required = false,
    ...rest
  },
  ref,
) {
  return (
    <div className="mb-3">
      <label
        htmlFor={inputName}
        className="block text-sm font-medium text-slate-700"
      >
        {labelContent}
      </label>
      <input
        ref={ref}
        id={inputName}
        name={inputName}
        type={inputType}
        placeholder={inputPlaceholder}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? `${inputName}-error` : undefined}
        className={`mt-1 block w-full rounded-md border-slate-300 shadow-sm sm:text-sm ${className}`}
        required={required}
        {...rest}
      />
      {errorMessage && (
        <p
          id={`${inputName}-error`}
          className="mt-1 text-xs text-red-600"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </div>
  )
})
