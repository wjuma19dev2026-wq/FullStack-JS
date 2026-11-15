import { redirect } from 'react-router-dom'
import { verifySession } from '../libs/session'

const authLoader = async ({ request }) => {
  // Opción A: solo comprobar que existe token (rápido, pero no valida)
  // const token = getTokenFromStorage();
  // if (!token) throw redirect('/login?next=' + encodeURIComponent(new URL(request.url).pathname));

  // Opción B: validar contra el backend (más seguro)
  const session = await verifySession()

  if (!session) {
    /**
      Guardamos la ruta original para volver después del login

      El detalle del `?next=`: cuando el usuario sea redirigido a `/`, tu componente de login puede leer ese parámetro y, tras autenticarse, navegar de vuelta a la página que intentaba visitar. Es la UX que los usuarios esperan.
     */

    const url = new URL(request.url)
    const params = new URLSearchParams({ next: url.pathname + url.search })
    throw redirect(`/?${params.toString()}`)
  }

  // Lo que devuelvas queda disponible con useLoaderData() en la ruta protegida exactamente donde se use el loader:AuthLoader
  return { user: session }
}

export default authLoader
