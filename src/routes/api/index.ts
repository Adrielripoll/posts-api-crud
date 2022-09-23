import express from 'express';
import router from './routes';
import { config } from 'dotenv'
import AuthMiddleware from '../../middleware/auth';
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../../swagger.json'

config()
const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use(AuthMiddleware) // This middleware must be declared after swagger api route

export default app.use(router)