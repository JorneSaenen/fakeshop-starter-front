import { useGetProductsQuery } from "@/store/apiSlice"
import { ProductCard } from "@/components/ProductCard"

export function Shop() {
  const { data: products, isLoading, error } = useGetProductsQuery()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shop All Products</h1>
      </div>

      {isLoading && <div className="py-8 text-center">Loading products...</div>}

      {error && <div className="py-8 text-center text-red-500">Error loading products. Please try again later.</div>}

      {products && products.length > 0 && (
        <ul className="grid list-none auto-rows-[1fr] grid-cols-1 gap-6 p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <li key={product._id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}

      {products && products.length === 0 && <div className="py-8 text-center">No products found.</div>}
    </div>
  )
}

export default Shop
