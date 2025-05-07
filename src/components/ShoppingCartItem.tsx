import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Trash2, Minus, Plus } from "lucide-react"
import { CartItem } from "@/lib/types"
import { useRemoveFromCartMutation, useUpdateCartItemMutation } from "@/store/apiSlice"
interface Props {
  item: CartItem
}

export function ShoppingCartItem({ item }: Props) {
  const [removeFromCart] = useRemoveFromCartMutation()
  const [updateCartItem] = useUpdateCartItemMutation()

  return (
    <div className="flex">
      {/* Square image with fixed dimensions */}
      <div className="aspect-square h-24 flex-shrink-0 overflow-hidden rounded bg-gray-100">
        <img src={item.productId.images[0]} alt={item.productId.title} className="h-full w-full object-cover" />
      </div>

      {/* Content column */}
      <div className="flex flex-1 flex-col justify-between gap-1.5 px-3 py-1">
        {/* Title and remove button */}
        <div className="flex items-center justify-between">
          <h3 className="line-clamp-1 font-medium">{item.productId.title}</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFromCart(item._id)}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>

        {/* Description */}
        <p className="line-clamp-1 text-sm text-gray-500">{item.productId.description}</p>

        {/* Quantity controls and price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center rounded border">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-none"
              onClick={() => {
                if (item.quantity === 1) return removeFromCart(item._id)
                updateCartItem({ id: item._id, quantity: item.quantity - 1 })
              }}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease</span>
            </Button>
            <span className="w-7 text-center">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-none"
              onClick={() => updateCartItem({ id: item._id, quantity: item.quantity + 1 })}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
          <div className="text-sm font-medium">{formatCurrency(item.productId.price * item.quantity)}</div>
        </div>
      </div>
    </div>
  )
}
