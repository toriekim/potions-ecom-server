import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { DataSource } from 'typeorm'
import { Category, Order, OrderItem, Product, User } from '../../../entities'
import { users } from '../seed-data/users'
import { orders } from '../seed-data/order'
import { products } from '../seed-data/products'
import { categories } from '../seed-data/categories'

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    // Save 1 custom admin entity, to the database
    const userRepository = dataSource.getRepository(User)
    const torie = userRepository.create({
      firstName: 'Torie',
      lastName: 'Kim',
      username: 'tk',
      email: 'tk@mail.com',
      password: 'tk_pw',
      isAdmin: true
    })
    // Save 4 custom user entities
    const [grace, gordon, guy, rachel] = userRepository.create(users)

    // Create Orders
    const orderRepository = dataSource.getRepository(Order)
    const [order1, order2, order3, order4, order5] =
      orderRepository.create(orders)

    // Assign Orders to Users
    torie.orders = [order1, order3]
    grace.orders = [order2]
    gordon.orders = [order5]
    guy.orders = []
    rachel.orders = [order4]

    // Create Categories
    const categoryRepository = dataSource.getRepository(Category)
    const [
      veg,
      vegan,
      gf,
      pastry,
      dinner,
      seafood,
      pasta,
      beef,
      chicken,
      spicy,
      healthy,
      easy,
      lunch,
      breakfast,
      df,
      lowCarb,
      pork
    ] = categoryRepository.create(categories)

    // Create Products
    const productRepository = dataSource.getRepository(Product)
    const [
      paella,
      som,
      tacos,
      poutine,
      crab,
      roll,
      lasagna,
      poke,
      croissant,
      chow,
      tarts,
      pierogi,
      pizza,
      curry,
      sushi
    ] = productRepository.create(products)
    paella.categories = [dinner, seafood]
    som.categories = [spicy, lowCarb, healthy, lunch]
    tacos.categories = [dinner, lunch, beef, healthy]
    poutine.categories = [easy, dinner, lunch]
    crab.categories = [seafood, spicy, dinner]
    roll.categories = [seafood, lunch, pork, healthy, gf]
    lasagna.categories = [veg, dinner, pasta]
    poke.categories = [seafood, lunch, healthy]
    croissant.categories = [pastry, breakfast]
    chow.categories = [dinner, spicy, lunch]
    tarts.categories = [pastry, breakfast]
    pierogi.categories = [veg, dinner, lunch]
    pizza.categories = [dinner, lunch, easy, veg]
    curry.categories = [dinner, lunch, spicy, gf]
    sushi.categories = [seafood, lunch, dinner, healthy]

    // Assign Products to Orders
    const orderedItemRepository = dataSource.getRepository(OrderItem)
    const [
      item1,
      item2,
      item3,
      item4,
      item5,
      item6,
      item7,
      item8,
      item9,
      item10
    ] = orderedItemRepository.create([
      // Order 1: total 3 items, total price 80
      { itemQty: 1, itemPrice: 40 }, // Paella
      { itemQty: 1, itemPrice: 20 }, // Som Tam
      { itemQty: 1, itemPrice: 20 }, // Poutine
      // Order 2: total 2 items, total price 55
      { itemQty: 1, itemPrice: 25 }, // Tacos
      { itemQty: 1, itemPrice: 30 }, // Chili Crab
      // Order 3: total 1 item, total price 20
      { itemQty: 1, itemPrice: 20 }, // Rolls
      // Order 4: total 2 items, total price 60
      { itemQty: 2, itemPrice: 30 }, // Poke
      // Order 5: total 6 items, total price 135
      { itemQty: 3, itemPrice: 20 }, // Tarts
      { itemQty: 2, itemPrice: 25 }, // Pierogi
      { itemQty: 1, itemPrice: 25 } // Chow
    ])

    // Assign OrderItems to Orders
    order1.orderedItems = [item1, item2, item3]
    order2.orderedItems = [item4, item5]
    order3.orderedItems = [item6]
    order4.orderedItems = [item7]
    order5.orderedItems = [item8, item9, item10]

    // Assign OrderItems to Products
    paella.orderedItems = [item1]
    som.orderedItems = [item2]
    poutine.orderedItems = [item3]
    tacos.orderedItems = [item4]
    crab.orderedItems = [item5]
    roll.orderedItems = [item6]
    poke.orderedItems = [item7]
    tarts.orderedItems = [item8]
    pierogi.orderedItems = [item9]
    chow.orderedItems = [item10]

    // Save all entities to the database
    await orderedItemRepository.save([
      item1,
      item2,
      item3,
      item4,
      item5,
      item6,
      item7,
      item8,
      item9,
      item10
    ])
    await orderRepository.save([order1, order2, order3, order4, order5])
    await userRepository.save([torie, grace, gordon, guy, rachel])
    await categoryRepository.save([
      veg,
      vegan,
      gf,
      pastry,
      dinner,
      seafood,
      pasta,
      beef,
      chicken,
      spicy,
      healthy,
      easy,
      lunch,
      breakfast,
      df,
      lowCarb,
      pork
    ])
    await productRepository.save([
      paella,
      som,
      tacos,
      poutine,
      crab,
      roll,
      lasagna,
      poke,
      croissant,
      chow,
      tarts,
      pierogi,
      pizza,
      curry,
      sushi
    ])
  }
}
