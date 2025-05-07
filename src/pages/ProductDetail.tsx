import { useParams, Link } from "react-router"
import { useGetProductByIdQuery } from "@/store/apiSlice"
import { formatCurrency } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { useAddToCartMutation } from "@/store/apiSlice"
import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useUser } from "@clerk/clerk-react"

export function ProductDetail() {
  const { isSignedIn } = useUser()
  const { id } = useParams<{ id: string }>()
  const { data: product, isLoading, error } = useGetProductByIdQuery(id || "")
  const [addToCart] = useAddToCartMutation()
  const [quantity, setQuantity] = useState(1)

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-xl">Loading product details...</div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold">Product not found</h1>
        <Link className={buttonVariants({ variant: "outline" })} to="/shop">
          Back to Shop
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({ productId: product._id, quantity })
  }

  const incrementQty = () => setQuantity(q => ++q)
  const decrementQty = () => setQuantity(q => Math.max(1, --q))

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/shop">Shop</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Product Image */}
          <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-gray-100 shadow-sm">
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold">{product.title}</h1>

            {/* Price */}
            <div className="text-primary text-2xl font-bold">{formatCurrency(product.price)}</div>

            {/* Description */}
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Quantity Selector and Add to Cart Button - now in a row */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex w-fit items-center rounded border">
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-none" onClick={decrementQty}>
                    <Minus className="h-3 w-3" />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <span className="w-7 text-center">{quantity}</span>
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-none" onClick={incrementQty}>
                    <Plus className="h-3 w-3" />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>

                {/* Add to Cart Button */}
                <Button disabled={!isSignedIn} onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-4 flex flex-col gap-2 text-sm text-gray-500">
              <div>
                <span className="font-medium">SKU:</span> {product._id}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
