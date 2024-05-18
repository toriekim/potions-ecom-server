import { Router } from 'express'
import { requireToken } from '../middlewares/auth'
import * as cartController from '../controllers/cart.controller'

const cartRouter = Router()

/*
 * GET /api/cart - Get logged-in User's Order w/ "CART" status
 * Requires: JWT
 * Returns: Order object
 */
cartRouter.get('/', requireToken, cartController.getUserCart)

/*
 * DELETE /api/cart - Delete logged-in User's existing Cart (Order w/ "CART" status)
 * Requires: JWT
 * Returns: 204 - Success message
 */
cartRouter.delete('/', requireToken, cartController.deleteUserCart)

/*
 * PUT /api/cart/add - Add Product to User's cart (or increment qty)
 * Requires: JWT
 * Returns: 200 - Updated Order object
 */
cartRouter.put('/add', requireToken, cartController.addProductToCart)

/*
 * PUT /api/cart/remove - Remove Product from User's cart (or decrement qty)
 * Requires: JWT
 * Returns: 200 - Updated Order object
 */
cartRouter.put('/remove', requireToken, cartController.removeProductFromCart)

export default cartRouter
