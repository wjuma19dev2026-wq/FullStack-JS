# APV — API REST

Documentación de referencia de la API del backend **APV (Administrador de Pacientes de Veterinaria)**.

Generada a partir del código fuente (`controllers/`, `routes/`, `models/`, `middlewares/`). No sustituye al código: cuando el comportamiento no está garantizado por el contrato se indica explícitamente como *observación*.

- **Versión:** 1.0.0
- **Tipo:** REST · JSON
- **Runtime:** Node.js + Express 5 (ESM)
- **Base de datos:** MongoDB (Mongoose 9)
- **Autenticación:** JWT vía `Authorization: Bearer <token>`

---

## 📑 Tabla de contenidos

1. [Convenciones](#-convenciones)
2. [Servidores](#-servidores)
3. [Autenticación](#-autenticación)
4. [Formato de errores](#-formato-de-errores)
5. [Modelos de datos](#-modelos-de-datos)
6. [Endpoints — Veterinarios](#-endpoints--veterinarios)
7. [Endpoints — Pacientes](#-endpoints--pacientes)
8. [Flujos de uso](#-flujos-de-uso)
9. [Observaciones y limitaciones](#-observaciones-y-limitaciones)

---

## 🧭 Convenciones

- Todas las peticiones y respuestas usan `Content-Type: application/json`.
- Las rutas cuelgan de la base `/api`.
- Los identificadores son `ObjectId` de MongoDB (24 caracteres hexadecimales).
- Los ejemplos de respuesta muestran la forma real del cuerpo devuelto por el código actual.

## 🌐 Servidores

| Entorno | URL |
|---|---|
| Local (`.env`) | `http://localhost:4000` |
| Fallback del código | `http://localhost:3000` |

> `PORT` se lee de `.env` (`../.env`); si no está definido, el servidor usa `3000`.

## 🔐 Autenticación

Las rutas protegidas usan el middleware `isAuth`, que:

1. Espera la cabecera `Authorization` con el prefijo `Bearer`.
2. Decodifica el JWT con `JWT_SECRET`.
3. Busca el veterinario por `decoded.id` y lo adjunta a `req.veterinario`, excluyendo `password`, `token` y `confirmado`.

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

- **Token sin prefijo `Bearer`** o **ausente** → `401` con `name: JsonWebTokenError` → `"Token inválido. Inicia sesión de nuevo."`
- **Token expirado** → `401` con `name: TokenExpiredError` → `"Tu sesión ha expirado. Inicia sesión de nuevo."`
- El token se emite en `POST /api/veterinarios/login` y **expira a los 30 días** (`expiresIn: '30d'`).

## 🚨 Formato de errores

Todos los errores pasan por el `ErrorHandler` central y comparten esta forma:

```json
{
  "message": "No autorizado",
  "status": "fail",
  "statusCode": 401
}
```

En `NODE_ENV=development` se añaden `isOperational` y `stack`.

| Código | Significado | Origen típico |
|---|---|---|
| `400` | Validación / ID inválido | Body vacío, `CastError` de Mongoose, validación de schema |
| `401` | No autenticado / no autorizado | Token inválido o expirado, recurso de otro veterinario |
| `403` | Prohibido | Email ya registrado al crear veterinario |
| `404` | Recurso no encontrado | ID inexistente, token de confirmación inválido |
| `500` | Error interno | Fallos de guardado / inesperados |

---

## 🧱 Modelos de datos

### `Veterinario`

| Campo | Tipo | Requerido | Notas |
|---|---|---|---|
| `_id` | `ObjectId` | auto | Generado por MongoDB |
| `nombre` | `String` | ✅ | `trim` |
| `password` | `String` | ✅ | Se hashea con **Argon2** en `pre('save')`; nunca se devuelve |
| `email` | `String` | ✅ | `unique` |
| `telefono` | `String` | ❌ | `null` por defecto, `trim` |
| `web` | `String` | ❌ | `null` por defecto |
| `token` | `String` | ❌ | UUID de confirmación (`randomUUID()`); `null` tras confirmar |
| `confirmado` | `Boolean` | ❌ | `false` por defecto |
| `createdAt` / `updatedAt` | `Date` | auto | `timestamps: true` |

### `Paciente`

| Campo | Tipo | Requerido | Notas |
|---|---|---|---|
| `_id` | `ObjectId` | auto | Generado por MongoDB |
| `nombre` | `String` | ✅ | Nombre de la mascota |
| `propietario` | `String` | ✅ | Nombre/identificador del dueño |
| `email` | `String` | ✅ | Email de contacto |
| `fecha` | `Date` | ❌ | `Date.now()` por defecto |
| `sintoma` | `String` | ✅ | Síntoma descrito |
| `veterinario` | `ObjectId` → `Veterinario` | ❌ | **Se asigna desde el token**, no desde el body |
| `createdAt` / `updatedAt` | `Date` | auto | `timestamps: true` |

### `PasswordReset`

| Campo | Tipo | Notas |
|---|---|---|
| `userId` | `ObjectId` → `Veterinario` | Dueño del token |
| `tokenHash` | `String` | SHA-256 del token en claro |
| `createdAt` | `Date` | Índice TTL: el documento se borra automáticamente tras **1 hora** |
| `usedAt` | `Date \| null` | Fecha de uso; `null` mientras está vigente |

---

## 🐴 Endpoints — Veterinarios

Base: `/api/veterinarios`

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| `POST` | `/api/veterinarios` | ❌ | Registra un veterinario |
| `GET` | `/api/veterinarios` | ✅ | Devuelve el veterinario autenticado |
| `GET` / `POST` | `/api/veterinarios/login` | ❌ | Inicia sesión y devuelve el JWT |
| `GET` | `/api/veterinarios/confirmar/:token` | ❌ | Confirma la cuenta con el token |
| `POST` | `/api/veterinarios/forgot-password` | ❌ | Solicita recuperación de contraseña |
| `GET` | `/api/veterinarios/forgot-password/:token` | ❌ | Verifica el token de recuperación |
| `POST` | `/api/veterinarios/forgot-password/:token` | ❌ | Cambia la contraseña con el token |
| `GET` | `/api/veterinarios/profile` | ❌ | Placeholder de perfil |
| `POST` | `/api/veterinarios/profile` | ❌ | Placeholder de perfil |

---

### `POST /api/veterinarios` — Registrar veterinario

Crea una cuenta de veterinario. Verifica primero que el email no exista y genera un `token` de confirmación.

**Body**

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `nombre` | `string` | ✅ | Nombre completo |
| `password` | `string` | ✅ | Se almacena hasheada (Argon2) |
| `email` | `string` | ✅ | Único |
| `telefono` | `string` | ❌ | Teléfono de contacto |
| `web` | `string` | ❌ | Sitio web |

```json
{
  "nombre": "Ana Pérez",
  "password": "secreto123",
  "email": "ana@example.com",
  "telefono": "+34 600 000 000",
  "web": "https://ana-vet.example.com"
}
```

**Respuestas**

| Código | Cuerpo | Cuándo |
|---|---|---|
| `200` | `{ "url": "Veterinario registrado con exito." }` | Registro correcto |
| `403` | `{ "error": {}, "message": "User already registered" }` | El email ya existe |
| `500` | `{ "message": "<detalle>" }` | Error al guardar |

```bash
curl -X POST http://localhost:4000/api/veterinarios \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Ana Pérez","password":"secreto123","email":"ana@example.com"}'
```

> **Observación:** responde `200` (no `201`) y usa la clave `url` en lugar del recurso creado.

---

### `GET /api/veterinarios` — Veterinario autenticado

Devuelve los datos del veterinario dueño del token.

**Auth:** `Bearer` requerido.

| Código | Cuerpo |
|---|---|
| `200` | `{ "url": "Desde API/VETERINARIOS", "veterinario": { ... } }` |
| `401` | Token inválido o ausente |

> **Observación:** el comentario del router lo agrupa como "ruta pública", pero en la práctica exige `isAuth`.

---

### `GET|POST /api/veterinarios/login` — Iniciar sesión

Autentica por email y contraseña y devuelve un JWT válido por 30 días.

**Body**

| Campo | Tipo | Requerido |
|---|---|---|
| `email` | `string` | ✅ |
| `password` | `string` | ✅ |

```json
{ "email": "ana@example.com", "password": "secreto123" }
```

**Respuestas**

| Código | Cuerpo | Cuándo |
|---|---|---|
| `200` | `{ "message": "Auth ", "token": "<JWT>" }` | Credenciales válidas |
| `404` | `{ "message": "Veterinario dosn't exists" }` | Email no registrado |
| `404` | `{ "message": "Credentials no valid" }` | Contraseña incorrecta |

```bash
curl -X POST http://localhost:4000/api/veterinarios/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ana@example.com","password":"secreto123"}'
```

> **Observación:** la comprobación de `confirmado` está comentada en el código, por lo que un usuario sin confirmar puede iniciar sesión. El endpoint también está montado en `GET`.

---

### `GET /api/veterinarios/confirmar/:token` — Confirmar cuenta

Valida el token de confirmación enviado al registrar y activa la cuenta.

**Parámetros de ruta**

| Nombre | Tipo | Descripción |
|---|---|---|
| `token` | `string` | UUID de confirmación |

**Respuestas**

| Código | Cuerpo | Cuándo |
|---|---|---|
| `200` | `{ "veterinario": { ... }, "message": "Confirmando el token, espere..." }` | Token válido |
| `404` | `{ "message": "Token no valido o ha expirado" }` | Token inexistente |
| `500` | `{ "message": "<detalle>" }` | Error al guardar |

**Efectos secundarios:** `token` pasa a `null` y `confirmado` a `true`.

---

### `POST /api/veterinarios/forgot-password` — Solicitar recuperación

Genera un token de recuperación, elimina los anteriores sin usar y guarda el hash (expira en 1 hora).

**Body**

| Campo | Tipo | Requerido |
|---|---|---|
| `email` | `string` | ✅ |

**Respuestas**

| Código | Cuerpo | Cuándo |
|---|---|---|
| `200` | `{ "message": "Te hemos enviado un coreeo electronico." }` | Solicitud registrada |
| `401` | `{ "message": "Invalid email or password" }` | Email no registrado (`name: INVALID_CREDENTIALS`) |

> **Observación:** el token en claro se imprime en consola (`console.log`) pero **no se envía por email** todavía; solo se persiste su hash. Por eso un cliente real no puede completar el flujo sin leer la consola.

---

### `GET /api/veterinarios/forgot-password/:token` — Verificar token

Comprueba que el token de recuperación existe y no ha sido usado.

**Respuestas**

| Código | Cuerpo | Cuándo |
|---|---|---|
| `200` | `{ "message": "forgotPasswordTokenVerify", "token": "<token>" }` | Token válido |
| `401` | `{ "message": "Invalid authentication token" }` | Token no existe (`name: TOKEN_INVALID`) |
| `401` | `{ "message": "Authentication token has expired" }` | Token ya usado (`name: TOKEN_EXPIRED`) |

---

### `POST /api/veterinarios/forgot-password/:token` — Cambiar contraseña

Cambia la contraseña del veterinario asociado al token y marca el token como usado.

**Body**

| Campo | Tipo | Requerido |
|---|---|---|
| `password` | `string` | ✅ |

**Respuestas**

| Código | Cuerpo | Cuándo |
|---|---|---|
| `200` | `{ "message": "Password changed succesfully!." }` | Cambio correcto |
| `401` | `{ "message": "Invalid authentication token" }` | Token no existe |
| `401` | `{ "message": "Authentication token has expired" }` | Token ya usado |

**Efectos secundarios:** actualiza `password` (re-hasheado por Argon2) y `usedAt` del token.

---

### `GET|POST /api/veterinarios/profile` — Perfil (placeholder)

Endpoints reservados, sin lógica ni autenticación.

| Método | Código | Cuerpo |
|---|---|---|
| `GET` | `200` | `{ "url": "Mostrando Perfil de Veterinario" }` |
| `POST` | `200` | `{ "url": "Desde API/VETERINARIOS/PROFILE" }` |

---

## 🐾 Endpoints — Pacientes

Base: `/api/pacientes` · **Todas las rutas requieren `isAuth`.**

Cada paciente pertenece a un veterinario. El listado y las operaciones se limitan a los pacientes del veterinario autenticado; acceder a un paciente de otro veterinario devuelve `401`.

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/pacientes` | Lista los pacientes del veterinario autenticado |
| `POST` | `/api/pacientes` | Registra un paciente |
| `GET` | `/api/pacientes/:pacienteId` | Obtiene un paciente |
| `PATCH` | `/api/pacientes/:pacienteId` | Actualiza el `nombre` de un paciente |
| `DELETE` | `/api/pacientes/:pacienteId` | Elimina un paciente |

---

### `GET /api/pacientes` — Listar pacientes

Devuelve únicamente los pacientes cuyo campo `veterinario` coincide con el veterinario autenticado.

| Código | Cuerpo |
|---|---|
| `200` | `{ "pacientes": [ { ... }, { ... } ] }` |
| `401` | Token inválido o ausente |

---

### `POST /api/pacientes` — Registrar paciente

Crea un paciente asociado automáticamente al veterinario autenticado.

**Body**

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `nombre` | `string` | ✅ | Nombre de la mascota |
| `propietario` | `string` | ✅ | Nombre/identificador del dueño |
| `email` | `string` | ✅ | Email de contacto |
| `sintoma` | `string` | ✅ | Síntoma descrito |
| `fecha` | `Date` | ❌ | Por defecto, fecha actual |

```json
{
  "nombre": "Firulais",
  "propietario": "Ana Pérez",
  "email": "ana@example.com",
  "sintoma": "Tos persistente"
}
```

**Respuestas**

| Código | Cuerpo | Cuándo |
|---|---|---|
| `200` | `{ "message": "Paciente creado!.", "paciente": { ... } }` | Creado correctamente |
| `400` | `{ "message": "El cuerpo de la petición está vacío o no es válido", ... }` | Body vacío/no válido |
| `400` | `{ "message": "Datos inválidos: ...", ... }` | Falla la validación del schema |
| `401` | Token inválido o ausente | — |

> **Observación:** responde `200` en lugar de `201`. El campo `veterinario` del body se ignora y se sobrescribe con el del token.

---

### `GET /api/pacientes/:pacienteId` — Obtener paciente

**Parámetros de ruta**

| Nombre | Tipo | Descripción |
|---|---|---|
| `pacienteId` | `ObjectId` | ID del paciente |

**Respuestas**

| Código | Cuerpo | Cuándo |
|---|---|---|
| `200` | `{ "paciente": { ... } }` | Encontrado y propio |
| `400` | `{ "message": "Recurso no encontrado. ID inválido: <valor>", ... }` | `pacienteId` malformado (`CastError`) |
| `404` | `{ "message": "Recurso no encontrado", ... }` | No existe |
| `401` | `{ "message": "No autorizado", ... }` | Pertenece a otro veterinario |

---

### `PATCH /api/pacientes/:pacienteId` — Actualizar paciente

Actualiza **únicamente** el campo `nombre`.

**Body**

| Campo | Tipo | Requerido |
|---|---|---|
| `nombre` | `string` | ✅ (para que el cambio tenga efecto) |

**Respuestas**

| Código | Cuerpo | Cuándo |
|---|---|---|
| `200` | `{ "message": "Paciente actualizado exitosamente." }` | Actualizado |
| `404` | `{ "message": "Recurso no encontrado", ... }` | No existe |
| `401` | `{ "message": "No autorizado", ... }` | No es del veterinario autenticado |

> **Observación:** aunque el tipo `Paciente` admita más campos, el controlador solo persiste `nombre`.

---

### `DELETE /api/pacientes/:pacienteId` — Eliminar paciente

**Respuestas**

| Código | Cuerpo | Cuándo |
|---|---|---|
| `200` | `{ "message": "Paciente eliminado exitosamente." }` | Eliminado |
| `404` | `{ "message": "Recurso no encontrado", ... }` | No existe |
| `401` | `{ "message": "No autorizado", ... }` | No es del veterinario autenticado |

**Efectos secundarios:** el documento se elimina de forma permanente (`deleteOne()`).

---

## 🔁 Flujos de uso

### Alta y uso básico

1. `POST /api/veterinarios` → registra la cuenta.
2. `GET /api/veterinarios/confirmar/:token` → confirma la cuenta.
3. `POST /api/veterinarios/login` → obtiene el JWT.
4. `POST /api/pacientes` (con `Bearer`) → registra una mascota.
5. `GET /api/pacientes` → lista solo tus pacientes.
6. `GET|PATCH|DELETE /api/pacientes/:pacienteId` → opera sobre uno concreto.

### Recuperación de contraseña

1. `POST /api/veterinarios/forgot-password` con el email.
2. `GET /api/veterinarios/forgot-password/:token` para verificar el token.
3. `POST /api/veterinarios/forgot-password/:token` con la nueva contraseña.

### Ejemplo autenticado

```bash
# 1. Login
TOKEN=$(curl -s -X POST http://localhost:4000/api/veterinarios/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ana@example.com","password":"secreto123"}' | jq -r .token)

# 2. Listar pacientes
curl http://localhost:4000/api/pacientes -H "Authorization: Bearer $TOKEN"
```

---

## ⚠️ Observaciones y limitaciones

Comportamiento real del código que conviene tener presente (no son bugs de la documentación, sino decisiones pendientes):

- El registro de veterinario responde `200` con `{ url }` en lugar de `201` con el recurso.
- `GET /api/veterinarios` exige autenticación pese a estar comentado como ruta pública.
- El login acepta `GET` y `POST`, y no valida `confirmado` (código comentado).
- `POST /forgot-password` genera y registra el token en consola, pero no lo envía por email.
- Los endpoints `/profile` son placeholders sin autenticación.
- `PATCH /api/pacientes/:pacienteId` solo actualiza `nombre`.
- Los errores de "no autorizado" en pacientes usan `401`; semánticamente podría discutirse `403`.
- No hay CORS, rate limiting ni cabeceras de seguridad configuradas.
- No existen tests automatizados.

---

## 🛠️ Entorno de ejecución

```bash
cd backend
npm run dev      # nodemon (recarga automática)
npm start        # node --env-file=../.env index.js
```

Variables relevantes (`.env` en la raíz del proyecto):

```env
NODE_ENV=development
PORT=4000
MONGO_URI=mongodb://localhost:27017/fullstack_js
JWT_SECRET=<secreto>
```
