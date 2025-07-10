import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { specs } from './swagger.js'
import heroController from './controllers/heroController.js'
import villainController from './controllers/villainController.js'
import battleController from './controllers/battleController.js'

const app = express()

app.use(express.json())

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use('/api', heroController)
app.use('/api', villainController)
app.use('/api', battleController)

const PORT = 3001
app.listen(PORT, _ => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})