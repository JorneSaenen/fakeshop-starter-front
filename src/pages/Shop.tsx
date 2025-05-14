import { ProductGrid } from "@/components/products/ProductGrid"

export function Shop() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shop All Products</h1>
      </div>

      <ProductGrid />
    </div>
  )
}

export default Shop
