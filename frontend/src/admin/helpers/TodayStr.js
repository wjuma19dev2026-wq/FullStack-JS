export const TodayStr = () => {
  const today = new Date()

  // Opción A: construir YYYY-MM-DD manualmente (recomendado, sin líos de timezone)
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')
  const todayStr = `${yyyy}-${mm}-${dd}` // "2026-11-15"

  return todayStr
}
