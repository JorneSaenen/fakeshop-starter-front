import { ProductCard } from "../products/ProductCard"
import { useGetFavoritesByUserIdQuery } from "@/store/apiSlice"
import { useAuth } from "@clerk/clerk-react"

export function FavoriteGrid() {
  const { isSignedIn, userId } = useAuth()

  const {
    data: favorites,
    isLoading,
    error,
  } = useGetFavoritesByUserIdQuery(userId as string, {
    skip: !isSignedIn,
  })

  if (isLoading) {
    return <div className="py-8 text-center">Loading favorites...</div>
  }

  if (!isSignedIn) return <div className="py-8 text-center">Please sign in to view your favorites.</div>

  if (error) {
    return <div className="py-8 text-center text-red-500">Error loading favorites. Please try again later.</div>
  }

  if (!favorites || favorites.length === 0) {
    return <div className="py-8 text-center">No favorites found.</div>
  }

  return (
    <ul className="grid list-none auto-rows-[1fr] grid-cols-1 gap-6 p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {favorites.map(favorite => (
        <li key={favorite._id}>
          <ProductCard product={favorite.productId} favoriteId={favorite._id} />
        </li>
      ))}
    </ul>
  )
}
