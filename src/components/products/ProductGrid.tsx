import { ProductCard } from "./ProductCard"
import { useGetFavoritesByUserIdQuery, useGetProductsQuery } from "@/store/apiSlice"
import { useAuth } from "@clerk/clerk-react"
export function ProductGrid() {
  const { isSignedIn, userId } = useAuth()
  const { data: products, isLoading, error } = useGetProductsQuery()
  const { data: favorites } = useGetFavoritesByUserIdQuery(userId as string, {
    skip: !isSignedIn,
  })

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
          <ProductCard
            product={product}
            favoriteId={favorites?.find(favorite => favorite.productId._id === product._id)?._id}
          />
        </li>
      ))}
    </ul>
  )
}
