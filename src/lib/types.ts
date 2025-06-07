export interface Product {
  _id: string
  title: string
  description: string
  price: number
  images: string[]
}

export interface CartItem {
  _id: string
  productId: Product
  quantity: number
  userId: string
}

export interface CheckoutResponse {
  url: string
}

interface OrderBaseType<T> {
  _id: string
  userId: string
  products: {
    productId: T
    quantity: number
  }[]
  status: "confirmed" | "paid" | "shipped" | "delivered" | "cancelled"
  createdAt: string
  updatedAt: string
}

export interface Favorite {
  _id: string
  productId: Product
  userId: string
}

export type Order = OrderBaseType<string>
export type OrderWithProduct = OrderBaseType<Product>
