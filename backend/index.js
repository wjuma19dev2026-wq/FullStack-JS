import express from "express"
import "colors"
import { connectToDatabase } from "./config/db.js"

const app = express()
const port = process.env.PORT || 3000

app.use((req, res) => {
  res.send("Hello World!")
})

connectToDatabase()
  .then(db => {
    app.listen(port, () => {
      console.log(
        `MongoDB conectado en ${db.connection.host}:${db.connection.port}`.yellow,
      )
      console.log(`Servidor corriendo en el puerto ${port}`.yellow)
    })
  })
  .catch(error => {
    console.error(`No se pudo iniciar el servidor: ${error.message}`.red)
    process.exitCode = 1
  })
