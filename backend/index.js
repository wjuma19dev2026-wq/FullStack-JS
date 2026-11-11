import express from 'express'
import morgan from 'morgan'
import 'colors'

import { connectToDatabase } from './config/db.js'
import { pacienteRoutes, veterinarioRoutes } from './routes/index.js'
import { ErrorHandler } from './middlewares/index.js'

const app = express()
const port = process.env.PORT || 3000

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'))
}

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
