import { NextFunction, Request, Response, Router } from 'express'
import * as productService from '../services/product.service'

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const products = await productService.getAll()
    res.status(200).send({ data: products })
  } catch (error) {
    next(error)
  }
}

async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const product = await productService.getById(id)
    res.status(200).send({ data: product })
  } catch (error) {
    next(error)
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { product } = req.body
    const newProduct = await productService.create(product)
    res
      .status(201)
      .send({ data: newProduct, message: 'Product created successfully' })
  } catch (error) {
    next(error)
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const { product } = req.body
    const updatedProduct = await productService.update(id, product)
    res
      .status(200)
      .send({ data: updatedProduct, message: 'Product updated successfully' })
  } catch (error) {
    next(error)
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    await productService.remove(id)
    res.status(204).send({ message: 'Product deleted successfully' })
  } catch (error) {
    next(error)
  }
}

export { get, getById, create, update, remove }
