import { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import {
  useAddFavoriteMutation,
  useAddToCartMutation,
  useGetFavoritesByUserIdQuery,
  useRemoveFavoriteMutation,
} from "@/store/apiSlice"
import { Link } from "react-router"
import { useAuth } from "@clerk/clerk-react"
import { Heart, HeartOff } from "lucide-react"
import { useEffect, useState } from "react"

interface ProductCardProps {
  product: Product
  favoriteId?: string
}

export function ProductCard({ product, favoriteId }: ProductCardProps) {
  const [addToCart] = useAddToCartMutation()
  const { isSignedIn, userId } = useAuth()
  const [addFavorite] = useAddFavoriteMutation()
  const [removeFavorite] = useRemoveFavoriteMutation()
  const { data } = useGetFavoritesByUserIdQuery(userId as string, { skip: !isSignedIn })
  const [isFavorited, setIsFavorited] = useState<boolean>(false)

  useEffect(() => {
    if (data) {
      setIsFavorited(data.some(favorite => favorite.productId._id === product._id))
    }
  }, [data, product._id])

  const toggleFavorite = async () => {
    if (!isSignedIn) return
    if (!isFavorited) {
      await addFavorite({ productId: product._id, userId: userId as string })
      return
    }
    await removeFavorite(favoriteId as string)
  }

  return (
    <Card className="grid h-full grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-lg border">
      <CardHeader className="p-0">
        <Link to={`/product/${product._id}`}>
          <div className="aspect-square w-full overflow-hidden bg-gray-100">
            <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover" />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="grid grid-rows-[auto_auto_1fr] gap-2 p-4">
        <h3 className="truncate text-lg font-semibold">{product.title}</h3>
        <div className="text-xl font-bold">{formatCurrency(product.price)}</div>
        <p className="line-clamp-2 text-sm text-gray-600">{product.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 p-4 pt-0">
        <Button
          variant="ghost"
          className="flex w-full items-center justify-center gap-2"
          onClick={toggleFavorite}
          disabled={!isSignedIn}
        >
          {isFavorited ? <HeartOff className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
          {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
        <Link to={`/product/${product._id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>

        <Button
          className="w-full"
          disabled={!isSignedIn}
          onClick={() => addToCart({ productId: product._id, quantity: 1 })}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
