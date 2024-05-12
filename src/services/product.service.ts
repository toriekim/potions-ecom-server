import { AppDataSource } from '../configs/database/data-source'
import logger from '../configs/logger'
import { Product } from '../entities'
import { ProductUpdateOptions } from '../types'
import { HTTP404Error } from '../utils/httpError.util'

const ProductRepository = AppDataSource.getRepository(Product)

export const getAll = async () => {
  const products = await ProductRepository.find()
  if (!products.length) {
    throw new HTTP404Error('No products found')
  }
  return products
}

export const getById = async (id: string) => {
  const product = await ProductRepository.findOneBy({ id })
  if (!product) {
    throw new HTTP404Error(`Product with ID ${id} not found`)
  }
  return product
}

export const create = async (productToCreate: Product) => {
  const newProduct = ProductRepository.create(productToCreate)
  const createdProduct = await ProductRepository.save(newProduct)
  logger.info(`New product ${createdProduct.name} created: `, createdProduct.id)
  return createdProduct
}

export const update = async (id: string, updateObj: ProductUpdateOptions) => {
  const productToUpdate = ProductRepository.findOneBy({ id })

  if (!productToUpdate) {
    throw new HTTP404Error('Product to update not found')
  }

  const updatedProduct = await ProductRepository.createQueryBuilder()
    .update(Product)
    .set(updateObj)
    .where('id = :id', { id })
    .execute()

  logger.info(
    `Product ${updatedProduct.raw[0].name} updated: `,
    updatedProduct.raw[0].id
  )
  return updatedProduct.raw[0]
}

export const remove = async (id: string) => {
  const productToDelete = ProductRepository.findOneBy({ id })

  if (!productToDelete) {
    throw new HTTP404Error('Product to delete not found')
  }

  const deletedProduct = await ProductRepository.createQueryBuilder()
    .softDelete()
    .where('id = :id', { id })
    .execute()

  if (!deletedProduct.affected) {
    throw new HTTP404Error('Product to delete not found')
  }
  logger.info(`Product with ID ${id} deleted successfully`)
  return deletedProduct.affected
}
