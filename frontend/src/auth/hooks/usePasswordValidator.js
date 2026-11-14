import { useState } from 'react'
import { PASSWORD_REGEX } from '../../utils'

const usePasswordValidator = () => {
  const [password, setPassword] = useState('')
  const [passwordTouched, setPasswordTouched] = useState(false)

  const isPasswordValid = PASSWORD_REGEX.test(password)
  const showPasswordError = passwordTouched && password.length > 0 && !isPasswordValid

  return {
    password,
    setPassword,
    passwordTouched,
    setPasswordTouched,
    isPasswordValid,
    showPasswordError,
  }
}

export default usePasswordValidator
