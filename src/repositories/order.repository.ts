import { Not } from 'typeorm'
import { AppDataSource } from '../configs/database/data-source'
import { CartStatus, Order } from '../entities/Order.entity'

export const OrderRepository = AppDataSource.getRepository(Order).extend({
  // Create a new "cart" for the user
  createNewCart(userId: string, itemPrice: number) {
    return this.save({
      totalPrice: itemPrice,
      totalQty: 1,
      recipient: '',
      shippingAddress: '',
      status: CartStatus.CART,
      user: { id: userId }
    })
  },
  // Find order of a user w/ "cart" status
  findCart(userId: string) {
    return this.findOne({
      where: { user: { id: userId }, status: CartStatus.CART }
    })
  },
  // Find order history of a user, excluding "cart" status
  findOrderHistory(userId: string) {
    return this.find({
      where: { user: { id: userId }, status: Not(CartStatus.CART) },
      order: { updatedAt: 'DESC' }
    })
  }
})
