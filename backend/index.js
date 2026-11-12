import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import 'colors'

import { connectToDatabase } from './config/db.js'
import { pacienteRoutes, veterinarioRoutes } from './routes/index.js'
import { ErrorHandler } from './middlewares/index.js'

const app = express()
const port = process.env.PORT || 3000

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'))
}

const allowedOrigins = [
  'http://localhost:5173', // Puedes añadir más orígenes de confianza
]

const corsOptions = {
  origin(origin, callback) {
    // Permite peticiones sin 'origin' (ej. Postman, curl, o el mismo servidor)
    if (!origin) {
      return callback(null, true)
    }

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true) // Origen permitido
    } else {
      callback(new Error('No permitido por CORS')) // Origen bloqueado
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Limita los métodos necesarios
  allowedHeaders: ['Content-Type', 'Authorization'], // Limita las cabeceras necesarias
}

app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/veterinarios', veterinarioRoutes)
app.use('/api/pacientes', pacienteRoutes)
app.use(ErrorHandler)

connectToDatabase()
  .then(db => {
    console.log(
      `MongoDB conectado en ${db.connection.host}:${db.connection.port}`.yellow,
    )
  })
  .catch(error => {
    console.error(`No se pudo iniciar el servidor: ${error.message}`.red)
    process.exitCode = 1
  })

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`.yellow)
})
