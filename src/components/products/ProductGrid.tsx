import { ProductCard } from "./ProductCard"
import { useGetProductsQuery } from "@/store/apiSlice"

export function ProductGrid() {
  const { data: products, isLoading, error } = useGetProductsQuery()

  if (isLoading) {
    return <div className="py-8 text-center">Loading products...</div>
  }

  if (error) {
    return <div className="py-8 text-center text-red-500">Error loading products. Please try again later.</div>
  }

  if (!products || products.length === 0) {
    return <div className="py-8 text-center">No products found.</div>
  }

  return (
    <ul className="grid list-none auto-rows-[1fr] grid-cols-1 gap-6 p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map(product => (
        <li key={product._id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
