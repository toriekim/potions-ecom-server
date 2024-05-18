import { Request, Response, NextFunction } from 'express'
import * as orderService from '../services/order.service'
import { HTTP403Error } from '../utils/httpError.util'
import { User } from '../entities'

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const orders = await orderService.getAll()
    res.status(200).send({ data: orders })
  } catch (err) {
    next(err)
  }
}

export async function getUserOrders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.params
    if (req.user?.id !== userId && !req.user?.isAdmin) {
      throw new HTTP403Error('Unauthorized')
    }
    const orders = await orderService.getUserOrders(userId)
    res.status(200).send({ data: orders })
  } catch (err) {
    next(err)
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const { user } = req
    const { orderId } = req.params
    const order = await orderService.getById(orderId, user)
    res.status(200).send({ data: order })
  } catch (err) {
    next(err)
  }
}

export async function updateStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { orderId } = req.params
    const { status } = req.body
    const updatedOrder = await orderService.updateStatus(orderId, status)
    res.status(200).send({ data: updatedOrder })
  } catch (err) {
    next(err)
  }
}
