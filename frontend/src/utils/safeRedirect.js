export function safeRedirect(next, fallback = '/admin') {
  if (!next) return fallback

  // 1. Solo rutas internas relativas
  if (!next.startsWith('/')) return fallback

  // 2. Rechazar "//" (protocol-relative: //evil.com)
  if (next.startsWith('//')) return fallback

  // 3. Rechazar "/\" y variantes que algunos navegadores interpretan como //
  if (next.startsWith('/\\')) return fallback

  // 4. Rechazar esquemas embebidos (por si acaso): "/javascript:..."
  if (/^\/[a-z]+:/i.test(next)) return fallback

  // 5. (Opcional) Whitelist de prefijos permitidos
  const allowedPrefixes = ['/admin', '/dashboard', '/pacientes', '/perfil']
  const isAllowed = allowedPrefixes.some(
    p => next === p || next.startsWith(`${p}/`) || next.startsWith(`${p}?`),
  )
  if (!isAllowed) return fallback

  return next
}
