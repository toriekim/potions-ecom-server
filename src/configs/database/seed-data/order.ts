import { CartStatus } from '../../../entities/Order.entity'

export const orders = [
  {
    // paella, som tam, poutine
    totalPrice: 80,
    totalQty: 3,
    recipient: 'Torie Kim',
    shippingAddress: '2161 Kinney St, Holyoke, MA 01040',
    status: CartStatus.CART
  },
  {
    // 1 taco, 1 chili crab
    totalPrice: 55,
    totalQty: 2,
    recipient: 'Grace Hopper',
    shippingAddress: '2196 Clarence Court, Rancho Cucamonga, CA 91730',
    status: CartStatus.CANCELED
  },
  {
    // 1 roll
    totalPrice: 20,
    totalQty: 1,
    recipient: 'Torie Kim',
    shippingAddress: '4241 Pick Street, Aurora, CO 80011',
    status: CartStatus.PURCHASED
  },
  {
    // 2 poke
    totalPrice: 60,
    totalQty: 2,
    recipient: 'Rachel Ray',
    shippingAddress: '3000 Oak Street, Old Forge, NY 13420',
    status: CartStatus.SHIPPED
  },
  {
    // 3 tarts, 2 pierogis, 1 chow
    totalPrice: 135,
    totalQty: 6,
    recipient: 'Gordon Ramsey',
    shippingAddress: '2335 Patterson Rd Apt 3, Brooklyn, NY 11204',
    status: CartStatus.DELIVERED
  }
]
