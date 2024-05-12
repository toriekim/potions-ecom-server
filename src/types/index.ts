export interface User {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  isAdmin: boolean
}

export interface UserUpdateOptions {
  firstName?: string
  lastName?: string
  username?: string
  email?: string
  password?: string
  isAdmin?: boolean
}

export interface ProductUpdateOptions {
  name?: string
  description?: string
  imageUrl?: string
  quantity?: number
  price?: number
  prepTime?: number
  country?: string
}
