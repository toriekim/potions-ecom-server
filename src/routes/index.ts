import { Router } from 'express'
import userRouter from './user.routes'
import productRouter from './products.routes'

const routes = Router()

routes.use('/users', userRouter)
routes.use('/products', productRouter)

export default routes
