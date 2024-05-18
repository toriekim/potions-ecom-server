import logger from '../configs/logger'
import { User } from '../entities'
import { CartStatus } from '../entities/Order.entity'
import { OrderRepository, OrderItemRepository } from '../repositories'
import { HTTP403Error, HTTP404Error } from '../utils/httpError.util'

// ---------- ORDERS ----------
export const getAll = async () => {
  const orders = await OrderRepository.find()
  if (!orders) {
    throw new HTTP404Error('No Orders found')
  }
  return orders
}

export const getUserOrders = async (userId: string) => {
  const orders = await OrderRepository.findOrderHistory(userId)
  if (!orders) {
    throw new HTTP404Error(`No Orders found for User ${userId}`)
  }
  return orders
}

export const getById = async (orderId: string, user: User) => {
  const order = await OrderRepository.findOneBy({ id: orderId })

  if (!order) {
    throw new HTTP404Error(`Order with ID ${orderId} not found`)
  }
  // Throw error if Order doesn't belong to the User & User is not an Admin
  if (order.user.id !== user.id && !user.isAdmin) {
    throw new HTTP403Error('User not authorized to view this Order')
  }

  return order
}

export const updateStatus = async (orderId: string, status: string) => {
  const order = await OrderRepository.findOneBy({ id: orderId })

  if (!order) {
    throw new HTTP404Error(`Order with ID ${orderId} not found`)
  }
  order.status = CartStatus[status as keyof typeof CartStatus]
  await OrderRepository.save(order)
  return order
}

// ---------- "CART" ORDERS ----------
export const getUserCart = async (userId: string) => {
  const cart = await OrderRepository.findCart(userId)
  if (!cart) {
    throw new HTTP404Error(`Cart for User ${userId} not found`)
  }
  return cart
}

export const deleteUserCart = async (userId: string) => {
  const cart = await OrderRepository.findCart(userId)
  // If a Cart isn't found or it's not a Cart, throw error
  if (!cart || cart.status !== CartStatus.CART) {
    throw new HTTP404Error(`Cart for User ${userId} not found`)
  }
  // If User is not the owner of the Cart, throw error
  if (userId !== cart.user.id) {
    throw new HTTP403Error(`User ${userId} not authorized to delete cart`)
  }
  // Otherwise, delete the Cart & all items in it
  const deletedCart = await OrderRepository.delete(cart.id)
  if (!deletedCart.affected) {
    throw new HTTP404Error(`Cart for User ${userId} not deleted`)
  }
  logger.info(`Cart for User ${userId} deleted`)
  return deletedCart.affected
}

export const addProductToCart = async (
  userId: string,
  productId: string,
  price: number,
  qty: number
) => {
  const cart = await OrderRepository.findCart(userId)
  // If User doesn't have a cart, create one for them
  if (!cart) {
    const newCart = await OrderRepository.createNewCart(userId, price, qty)
    // Add the product by creating a new OrderItem
    const newCartItem = await OrderItemRepository.createItem(
      newCart.id,
      productId,
      price,
      qty
    )
    return newCartItem
  }

  // Check if the product is already in the cart
  const existingCartItem = await OrderItemRepository.findItem(
    cart.id,
    productId
  )
  // If the product is not in the cart, create a new OrderItem
  if (!existingCartItem) {
    await OrderItemRepository.createItem(cart.id, productId, price, qty)
  } else {
    // If the product is already in the cart, increment the quantity
    existingCartItem.itemQty += qty
    await OrderItemRepository.save(existingCartItem)
  }

  // Finally, increment Cart total quantity & price
  cart.totalQty += qty
  cart.totalPrice += price * qty
  await OrderRepository.save(cart)

  return cart
}

export const removeProductFromCart = async (
  userId: string,
  productId: string,
  price: number,
  qty: number
) => {
  const cart = await OrderRepository.findCart(userId)

  if (!cart) {
    throw new HTTP404Error(`Cart for User ${userId} not found`)
  }

  // Check if the product is already in the cart
  const existingCartItem = await OrderItemRepository.findItem(
    cart.id,
    productId
  )

  if (!existingCartItem) {
    throw new HTTP404Error(`Product with ID ${productId} not found in cart`)
  }
  // If there's only 1 cart item or input qty is greater than or equal to cart item qty, delete the OrderItem
  if (existingCartItem.itemQty === 1 || qty >= existingCartItem.itemQty) {
    await OrderItemRepository.delete({ id: existingCartItem.id })
    cart.totalQty -= existingCartItem.itemQty
    cart.totalPrice -= price * existingCartItem.itemQty
  } else {
    // Otherwise, decrement the quantity
    existingCartItem.itemQty -= qty
    await OrderItemRepository.save(existingCartItem)
    cart.totalQty -= qty
    cart.totalPrice -= price * qty
  }
  await OrderRepository.save(cart)
  return cart
}
