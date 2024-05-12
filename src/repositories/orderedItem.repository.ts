import { AppDataSource } from '../configs/database/data-source'
import { OrderedItem } from '../entities/OrderedItem.entity'

export const OrderedItemRepository = AppDataSource.getRepository(
  OrderedItem
).extend({
  // Find a row matching the orderId and incoming productId
  findOrderedItem(orderId: string, productId: string) {
    return this.findOne({
      where: { order: { id: orderId }, product: { id: productId } }
    })
  }
})
