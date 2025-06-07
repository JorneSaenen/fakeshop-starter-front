import { FavoriteGrid } from "@/components/favorites/FavoriteGrid"

export function Favorites() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Favorites</h1>
      </div>
      <FavoriteGrid />
    </div>
  )
}

export default Favorites
