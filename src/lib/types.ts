export interface Product {
  _id: string
  title: string
  description: string
  price: number
  images: string[]
}

export interface CartItem {
  productId: Product
  quantity: number
  userId: string
  _id: string
}
