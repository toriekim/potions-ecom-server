import { Router } from 'express'
import userRouter from './user.routes'
import productRouter from './products.routes'
import orderRouter from './order.routes'

const routes = Router()

routes.use('/users', userRouter)
routes.use('/products', productRouter)
routes.use('/orders', orderRouter)

export default routes
