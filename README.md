# APV - Administrador de Pacientes de Veterinaria

Backend API REST para la gestión de veterinarios de una clínica. El proyecto se encuentra en desarrollo y por ahora cubre la base del servidor, la conexión a MongoDB y el registro de veterinarios. Todavía no incluye frontend ni autenticación.

> **Estado:** backend en desarrollo. Solo el registro de veterinarios persiste datos; el resto de endpoints son placeholders.

## 🚀 Características

### Implementadas

- Servidor HTTP con **Express 5** y módulos ES (`"type": "module"`).
- Conexión a **MongoDB** mediante **Mongoose 9**.
- Configuración por variables de entorno con el soporte nativo de Node (`--env-file`), sin `dotenv`.
- Arquitectura **MVC**: rutas, controladores, modelos, configuración y helpers.
- Modelo `Veterinario` con validaciones básicas de esquema.
- **Registro de veterinarios** (`POST /api/veterinarios`) con:
  - Verificación de email duplicado.
  - Generación de token único con `crypto.randomUUID()`.
  - Persistencia en MongoDB.
- Parseo de JSON en las peticiones (`express.json()`).
- Logging HTTP con **Morgan**, activo solo en `NODE_ENV=development`.
- Salida de consola con colores mediante `colors`.
- Flujo de desarrollo con **nodemon** y configuración centralizada en `nodemon.json`.
- Recarga del navegador opcional con **browser-sync** (pendiente de interfaz).
- Formato de código con **Prettier**.

### En desarrollo / pendientes

- Autenticación con JWT y login funcional.
- Hash de contraseñas.
- CRUD completo de veterinarios.
- Confirmación de cuenta por email.
- Validación y sanitización de datos de entrada.
- Middleware centralizado de errores.
- Frontend y vistas.
- Tests automatizados.
- CORS, rate limiting y cabeceras de seguridad.

## 🛠️ Tecnologías utilizadas

### Backend

- Node.js (probado con `v26.13.0`)
- Express `^5.3.0`
- Mongoose `^9.12.1`
- MongoDB
- Morgan `^1.12.1`
- Colors `^1.4.0`

### Herramientas de desarrollo

- Git / GitHub
- npm
- Nodemon `^3.1.14`
- BrowserSync `^3.0.4`
- npm-run-all `^4.1.5`
- Prettier

> **Frontend:** aún no implementado. El README inicial mencionaba React, Vite y Tailwind, pero el repositorio todavía no contiene código de frontend.

## 📋 Requisitos previos

- **Node.js 20.6 o superior** (recomendado 22 o 26), porque se usa `--env-file`.
- npm.
- Git.
- MongoDB local en `mongodb://localhost:27017` o una URI de MongoDB Atlas.

## ⚙️ Instalación

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd fullstackjs
```

2. Instala las dependencias del backend:

```bash
cd backend
npm install
```

3. Crea el archivo `.env` en la **raíz del proyecto** (`fullstackjs/.env`):

```env
NODE_ENV=development
PORT=4000
MONGO_URI=mongodb://localhost:27017/fullstack_js
```

> El archivo `.env` está incluido en `.gitignore`. No subas credenciales reales al repositorio.

4. Verifica que MongoDB esté corriendo:

```bash
mongod --version
# o, si usas Docker:
# docker run -d -p 27017:27017 --name mongo mongo:7
```

## ▶️ Uso

Todos los comandos se ejecutan desde `backend/`.

```bash
cd backend
npm run dev
```

El servidor queda disponible en `http://localhost:4000` (o el `PORT` definido en `.env`).

### Scripts disponibles

| Script | Comando | Uso |
|---|---|---|
| `npm run dev` | `nodemon index` | Desarrollo con recarga automática. Usa `nodemon.json`. |
| `npm start` | `node --env-file=../.env index.js` | Ejecución directa sin watcher. |
| `npm run dev:debug` | `nodemon --env-file=../.env --inspect=9229 index.js` | Desarrollo con inspector en el puerto `9229`. |
| `npm run watch:server` | `nodemon --env-file=../.env --ignore 'public/**/*' index.js` | Solo recarga del servidor. |
| `npm run watch:browser` | `browser-sync start --proxy localhost:4000 ...` | Recarga del navegador (requiere vistas/público). |
| `npm run dev:bs` | `npm-run-all --parallel watch:server watch:browser` | Servidor + navegador en paralelo. |

> `nodemon.json` se aplica a todos los scripts que usan nodemon: define `watch`, `ignore`, `delay`, `NODE_ENV=development` y el comando `node --env-file=../.env --enable-source-maps`.

## 🔌 API REST

Base URL: `http://localhost:4000/api/veterinarios`

| Método | Ruta | Estado | Descripción |
|---|---|---|---|
| `POST` | `/api/veterinarios` | ✅ Implementado | Registra un veterinario. Responde `200` o `403` si el email ya existe. |
| `GET` | `/api/veterinarios` | 🚧 Placeholder | Devuelve un mensaje fijo; aún no lista veterinarios. |
| `GET` | `/api/veterinarios/profile` | 🚧 Placeholder | Reservado para el perfil del veterinario. |
| `POST` | `/api/veterinarios/profile` | 🚧 Placeholder | Reservado para actualizar el perfil. |
| `GET` | `/api/veterinarios/login` | 🚧 Placeholder | Reservado para login. Debería ser `POST` cuando se implemente. |

### Registro de veterinario

```bash
curl -X POST http://localhost:4000/api/veterinarios \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ana Pérez",
    "password": "secreto123",
    "email": "ana@example.com",
    "telefono": "+34 600 000 000",
    "web": "https://ana-vet.example.com"
  }'
```

Respuesta actual:

```json
{
  "url": "Veterinario registrado con exito."
}
```

Si el email ya está registrado:

```json
{
  "error": {},
  "message": "User already registered"
}
```

> La respuesta de éxito usa la clave `url` y el código `200`; lo ideal a futuro es `201 Created` y un cuerpo con el recurso creado.

### Modelo `Veterinario`

| Campo | Tipo | Reglas |
|---|---|---|
| `nombre` | `String` | Requerido, `trim`. |
| `password` | `String` | Requerido. **Actualmente se guarda sin hash.** |
| `email` | `String` | Requerido, único. |
| `telefono` | `String` | Opcional, `null` por defecto, `trim`. |
| `web` | `String` | Opcional, `null` por defecto. |
| `token` | `String` | Token único generado con `randomUUID()` al registrar. |
| `confirmado` | `Boolean` | `false` por defecto. |
| `createdAt` / `updatedAt` | `Date` | Generados por `timestamps: true`. |

`versionKey: false` desactiva el campo `__v` de Mongoose.

## 📁 Estructura del proyecto

```text
fullstackjs/
├── .env                  # Variables de entorno (no versionado)
├── .gitignore
├── .prettierrc
├── README.md
└── backend/
    ├── config/
    │   └── db.js                    # Conexión a MongoDB
    ├── controllers/
    │   └── veterinario.controller.js
    ├── helpers/
    │   ├── generateUniqueId.js      # randomUUID()
    │   └── index.js
    ├── models/
    │   └── veterinario.model.js
    ├── routes/
    │   └── veterinario.route.js
    ├── api/                         # Reservado
    ├── middlewares/                 # Reservado
    ├── utils/                       # Reservado
    ├── logs/                        # Registro local de consultas (ignorado por Git)
    ├── index.js                     # Punto de entrada
    ├── nodemon.json
    └── package.json
```

## 🧭 Decisiones técnicas actuales

- **ESM nativo:** se usa `import`/`export` sin transpilador.
- **Variables de entorno nativas:** Node carga `../.env` con `--env-file`, por lo que `dotenv` no es necesario.
- **Configuración de nodemon externa:** `nodemon.json` define watch, ignore, delay y el comando de ejecución.
- **Tokens con `node:crypto`:** no se agregó una dependencia externa para generar UUIDs.
- **Separación por capas:** el controlador no conoce detalles de Express más allá de `req`/`res`, y el modelo concentra el esquema.

## ⚠️ Limitaciones y deuda técnica

- La contraseña se almacena en texto plano; falta `bcrypt` o `argon2`.
- No hay autenticación ni autorización; el token generado no se usa todavía.
- `confirmado` existe en el modelo, pero no hay flujo de confirmación por email.
- Los endpoints de lista, perfil y login son placeholders.
- No hay validación de entrada ni manejo centralizado de errores.
- `GET /login` no es semánticamente correcto; debería ser `POST`.
- El registro responde `200` en vez de `201`, y usa `{ url: ... }` como respuesta temporal.
- La verificación de email duplicado puede sufrir condiciones de carrera; el índice `unique` de MongoDB es la última defensa.
- No hay CORS configurado, por lo que un frontend en otro puerto necesitará habilitarlo.
- No existen tests automatizados.
- Los scripts de BrowserSync apuntan a `public/` y `views/`, carpetas que aún no existen.

## 🗺️ Próximos pasos

1. Hashear contraseñas con `bcrypt`.
2. Implementar `POST /login` y autenticación con JWT.
3. Añadir middleware de autenticación para rutas privadas.
4. Implementar confirmación de cuenta por email usando `token` y `confirmado`.
5. Completar el CRUD de veterinarios.
6. Añadir validación con `express-validator` o Zod.
7. Crear un middleware centralizado de errores y unificar códigos HTTP.
8. Configurar CORS, `helmet` y rate limiting.
9. Añadir tests con Vitest y Supertest.
10. Construir el frontend.

## 👤 Autor

**Wilson Juma**

Proyecto desarrollado como parte del aprendizaje de JavaScript FullStack.

## 📄 Licencia

ISC.
