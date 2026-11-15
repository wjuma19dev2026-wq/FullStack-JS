// @ts-check

/**
 * @typedef {'connection'|'alert'|'info'} ToastTypes
 */

import { Toast } from '@base-ui/react'

/**
 * Crea un toast
 * @param {ToastTypes} type Tipos de toast
 */
const UToast = function (type) {
  this.type = type
}

UToast.prototype.show = function () {
  console.log('uToast works!.')
  const toastManager = Toast.useToastManager()
}

export { UToast }
