import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../../components'
import { InputForm } from '../components/InputForm'
import pacienteShcema from '../validation/paciente.schema'
import { cn } from 'cn'

export const PacienteForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid, touchedFields, dirtyFields },
  } = useForm({
    resolver: zodResolver(pacienteShcema),
    defaultValues: {
      mascota: '',
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
  })

  const onSubmit = async data => {
    try {
      // await api.crearPaciente(data)
      console.log(data)
      reset()
    } catch (error) {
      // Aquí podrías usar setError() de RHF para inyectar
      // errores devueltos por el backend en campos concretos.
    }
  }

  /**
   * Genera las clases Tailwind según el estado del campo.
   *
   * - **rojo** si hay error.
   * - **verde** si fue tocado y tiene valor válido.
   * - **neutro** en el resto.
   *
   * @param {keyof PacienteForm} name — Clave del campo.
   * @returns {string} — Clases concatenadas para `className`.
   */
  const fieldClass = name =>
    cn(
      'transition-colors duration-200 ring-1 ring-inset',
      errors[name]
        ? 'ring-red-500 focus:ring-red-500'
        : touchedFields[name] && dirtyFields[name]
          ? 'ring-emerald-500 focus:ring-emerald-500'
          : 'ring-slate-300 focus:ring-slate-400',
    )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('mt-1 sm:block bg-white p-3 shadow-md lg:mb-0')}
      noValidate
    >
      {Object.keys(errors).length > 0 && (
        <p
          className="mb-2 text-sm text-red-600"
          role="alert"
        >
          Revisa los campos marcados en rojo.
        </p>
      )}

      <InputForm
        inputName="mascota"
        inputType="text"
        labelContent="nombre mascota"
        inputPlaceholder="nombre de la mascota"
        className={fieldClass('mascota')}
        errorMessage={errors.mascota?.message}
        {...register('mascota')}
        required={true}
      />
      <Button
        btnType="submit"
        btnDisabled={!isValid}
        btnFetching={isSubmitting}
        btnValue="agregar paciente"
      />
    </form>
  )
}
