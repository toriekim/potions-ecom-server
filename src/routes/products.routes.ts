import { Router } from 'express'
import { isAdmin, requireToken } from '../middlewares/auth'
import * as productController from '../controllers/product.controller'

const productRouter = Router()

/*
 * GET /api/products - Get All Products
 * Returns: Array of Product objects
 */
productRouter.get('/', productController.get)

/*
 * GET /api/products/:id - Get Product By Id
 * Returns: Product object
 */
productRouter.get('/:id', productController.getById)

/*
 * POST /api/products - Create Product
 * Requires: JWT, Admin Role
 * Returns: New Product object
 */
productRouter.post('/', requireToken, isAdmin, productController.create)

/*
 * PUT /api/products/:id - Update Single Product
 * Requires: JWT, Admin Role
 * Returns: Updated Product object
 */
productRouter.put('/:id', requireToken, isAdmin, productController.update)

/*
 * DELETE /api/products/:id - Delete Single Product
 * Requires: JWT, Admin Role
 * Returns: 204 - No Content
 */
productRouter.delete('/:id', requireToken, isAdmin, productController.remove)

export default productRouter
