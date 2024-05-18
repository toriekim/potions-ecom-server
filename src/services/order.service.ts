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
  if (!cart) {
    throw new HTTP404Error(`Cart for User ${userId} not found`)
  }
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
  price: number
) => {
  const cart = await OrderRepository.findCart(userId)
  // If User doesn't have a cart, create one for them
  if (!cart) {
    const newCart = await OrderRepository.createNewCart(userId, price)
    // Add the product by creating a new OrderItem
    const newCartItem = await OrderItemRepository.createItem(
      newCart.id,
      productId,
      price
    )
    return newCartItem
  }
  // Otherwise, User cart was found, increment total quantity & price
  cart.totalQty += 1
  cart.totalPrice += price
  await OrderRepository.save(cart)

  // Check if the product is already in the cart
  const existingCartItem = await OrderItemRepository.findItem(
    cart.id,
    productId
  )
  // If the product is not in the cart, create a new OrderItem
  if (!existingCartItem) {
    const newCartItem = await OrderItemRepository.createItem(
      cart.id,
      productId,
      price
    )
    return newCartItem
  }

  // If the product is already in the cart, increment the quantity
  existingCartItem.itemQty += 1
  existingCartItem.itemPrice += price
  await OrderItemRepository.save(existingCartItem)
  return existingCartItem
}

export const removeProductFromCart = async (
  userId: string,
  productId: string,
  price: number
) => {
  const cart = await OrderRepository.findCart(userId)

  if (!cart) {
    throw new HTTP404Error(`Cart for User ${userId} not found`)
  }
  // Otherwise, decrement product qty & price from cart's totals
  cart.totalQty -= 1
  cart.totalPrice -= price
  await OrderRepository.save(cart)

  // Check if the product is already in the cart
  const existingCartItem = await OrderItemRepository.findItem(
    cart.id,
    productId
  )

  if (!existingCartItem) {
    throw new HTTP404Error(`Product with ID ${productId} not found in cart`)
  }
  // If product qty is greater than 1, decrement the quantity
  if (existingCartItem.itemQty > 1) {
    existingCartItem.itemQty -= 1
    await OrderItemRepository.save(existingCartItem)
  } else {
    // Otherwise, delete the OrderItem
    await OrderItemRepository.delete({ id: existingCartItem.id })
  }
  return existingCartItem
}

export const removeAllProductFromCart = async (
  userId: string,
  productId: string
) => {
  const cart = await OrderRepository.findCart(userId)
  if (!cart) {
    throw new HTTP404Error(`Cart for User ${userId} not found`)
  }
  // Otherwise, delete the OrderItem
  const itemToDelete = await OrderItemRepository.findItem(cart.id, productId)
  if (!itemToDelete) {
    throw new HTTP404Error(`Product with ID ${productId} not found in cart`)
  }
  const deletedCartItem = await OrderItemRepository.delete({
    id: itemToDelete.id
  })

  if (!deletedCartItem.affected) {
    throw new HTTP404Error(
      `Product(s) with ID ${productId} not deleted from cart`
    )
  }
  cart.totalPrice -= itemToDelete.itemPrice * itemToDelete.itemQty
  cart.totalQty -= itemToDelete.itemQty
  await OrderRepository.save(cart)
  return deletedCartItem.affected
}
