/**
 * Tipos válidos del atributo `type` de un `<input>` HTML.
 *
 * @typedef {'text'
 *   | 'password'
 *   | 'email'
 *   | 'tel'
 *   | 'url'
 *   | 'search'
 *   | 'number'
 *   | 'range'
 *   | 'date'
 *   | 'time'
 *   | 'datetime-local'
 *   | 'month'
 *   | 'week'
 *   | 'color'
 *   | 'checkbox'
 *   | 'radio'
 *   | 'file'
 *   | 'hidden'
 *   | 'submit'
 *   | 'reset'
 *   | 'button'
 *   | 'image'
 * } InputTypeOpts
 */

/**
 * @typedef {'button'|'submit'|'reset'} BtnTypes
 */

/**
 * @typedef {Object} InputFormProps
 * @property {InputTypeOpts} inputType
 * @property {string} inputName
 * @property {boolean} [showError=false]
 * @property {string} inputValue
 * @property {string} [inputPlaceholder]
 * @property {string | import('react').ReactNode} [labelContent]
 * @property {(event: import('react').ChangeEvent<HTMLInputElement>) => void} [inputChange]
 * @property {boolean} [required=false]
 * @property {() => void} [inputBlur]
 */

/**
 * @typedef {Object} ButtonFormProps
 * @property {string} btnValue
 * @property {BtnTypes} btnType
 * @property {boolean} btnDisabled
 * @property {boolean} btnFetching
 */

export {}
