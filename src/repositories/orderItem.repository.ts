import { AppDataSource } from '../configs/database/data-source'
import { OrderItem } from '../entities/OrderItem.entity'

export const OrderItemRepository = AppDataSource.getRepository(
  OrderItem
).extend({
  // Find a row matching the orderId and incoming productId
  findItem(orderId: string, productId: string) {
    return this.findOne({
      where: { order: { id: orderId }, product: { id: productId } }
    })
  },
  createItem(
    orderId: string,
    productId: string,
    itemPrice: number,
    itemQty: number = 1
  ) {
    return this.save({
      order: { id: orderId },
      product: { id: productId },
      itemPrice,
      itemQty
    })
  }
})
