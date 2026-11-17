export const dateToInputValue = fecha => {
  const formatted = new Date(fecha)
  const fechaInput = new Date(
    formatted.getTime() - formatted.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .slice(0, 10)

  return fechaInput
}
