/**
 * @typedef {'default' | 'error' | 'success'} AlertType
 */

/**
 * @typedef {SubmitEvent & { currentTarget: HTMLFormElement }} FormSubmitEvent
 */

/**
 * @typedef {Object} AlertOptions
 * @property {string} [title]
 * @property {string} [message]
 * @property {AlertType} [type]
 */

/**
 * @typedef {Object} ApiSuccessData
 * @property {boolean} [success]
 * @property {string} [title]
 * @property {string} [message]
 */

/**
 * @typedef {Object} ApiSuccessResponse
 * @property {ApiSuccessData} [data]
 */

/**
 * @typedef {Object} ApiErrorData
 * @property {string} [message]
 */

/**
 * @typedef {Object} ApiErrorResponse
 * @property {{ data?: ApiErrorData }} [response]
 */

/**
 * @typedef {Object} UseFormOptions
 * @property {() => Promise<ApiSuccessResponse>} peticionHttp
 */

/**
 * @typedef {Object} UseFormReturn
 * @property {string} correo
 * @property {boolean} touched
 * @property {AlertOptions} alertOpts
 * @property {boolean} showAlert
 * @property {boolean} isValid
 * @property {boolean} isFetching
 * @property {boolean} showError
 * @property {(value: string) => void} setCorreo
 * @property {(value: boolean) => void} setTouched
 * @property {(value: AlertOptions) => void} setAlertOpts
 * @property {(value: boolean) => void} setIsFetching
 * @property {(value: boolean) => void} setShowAlert
 * @property {(e: FormSubmitEvent) => Promise<void>} handleSubmit
 */
export {}
