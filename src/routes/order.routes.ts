import { Router } from 'express'
import { isAdmin, requireToken } from '../middlewares/auth'
import * as orderController from '../controllers/order.controller'

const orderRouter = Router()

/*
 * GET /api/orders - Get all Orders & all Products in each Order
 * Requires: JWT, Admin Role
 * Returns: Order[] w/ Products[]
 */
orderRouter.get('/', requireToken, isAdmin, orderController.getAll)

/*
 * GET /api/orders/user/:userId - Get all Orders for a User (User's Order History)
 * Requires: JWT and/or Admin Role
 * Returns: Order[] w/ Products[]
 */
orderRouter.get('/user/:userId', requireToken, orderController.getUserOrders)

/*
 * GET /api/orders/:orderId - Get a specific Order by ID
 * Requires: JWT and/or Admin Role
 * Returns: Order w/ Products[]
 */
orderRouter.get('/:orderId', requireToken, orderController.getById)

/*
 * PUT /api/orders/:orderId - Update Order Status
 * Update a "cart" Order to a "purchased" Order & update Product inventory
 * Requires: JWT and/or Admin Role
 */
orderRouter.put('/:orderId', requireToken, orderController.updateStatus)

export default orderRouter
