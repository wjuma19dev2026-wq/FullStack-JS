export const dateFormat = date => {
  const fecha = new Date(date)
  return Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(fecha)
}
