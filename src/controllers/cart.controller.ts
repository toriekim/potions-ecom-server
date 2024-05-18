import { Request, Response, NextFunction } from 'express'
import * as orderService from '../services/order.service'
import { User } from '../entities'
import { HTTP404Error } from '../utils/httpError.util'

export async function getUserCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.user as User
    const cart = await orderService.getUserCart(id)
    res.status(200).send({ data: cart })
  } catch (err) {
    next(err)
  }
}

export async function deleteUserCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.user as User
    await orderService.deleteUserCart(id)
    res.status(204).send({ message: 'Cart deleted successfully' })
  } catch (err) {
    next(err)
  }
}

export async function addProductToCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, price, qty } = req.body
    const { id: userId } = req.user as User
    const updatedCart = await orderService.addProductToCart(
      userId,
      id,
      price,
      qty
    )
    res
      .status(200)
      .send({ data: updatedCart, message: `Product successfully added` })
  } catch (err) {
    next(err)
  }
}

export async function removeProductFromCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, price, qty } = req.body
    const { id: userId } = req.user as User
    const updatedCart = await orderService.removeProductFromCart(
      userId,
      id,
      price,
      qty
    )
    res
      .status(200)
      .send({ data: updatedCart, message: `Product successfully removed` })
  } catch (err) {
    next(err)
  }
}
