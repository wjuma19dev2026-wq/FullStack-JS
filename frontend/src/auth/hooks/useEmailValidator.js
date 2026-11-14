import { useState } from 'react'
import { EMAIL_REGEX } from '../../utils'

const useEmailValidator = () => {
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)

  const isFormValid = EMAIL_REGEX.test(email)
  const showError = touched && email.length > 0 && !isFormValid

  return {
    email,
    setEmail,
    touched,
    setTouched,
    isFormValid,
    showError,
  }
}

export default useEmailValidator
