import express, { Request, Response } from 'express'
import { applyMiddleware } from './utils/helper.util'
import routes from './routes'
import middlewares from './middlewares'
import errorHandlers from './middlewares/errorHandlers'
import authRouter from './routes/auth.routes'

// Initialize express
const app = express()

// Add middlewares
applyMiddleware(middlewares, app)

// Add auth & API routes
app.use('/auth', authRouter)
app.use('/api', routes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world! :D')
})

// Add error handlers
applyMiddleware(errorHandlers, app)

export default app
