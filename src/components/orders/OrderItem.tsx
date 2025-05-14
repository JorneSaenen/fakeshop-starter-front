import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatCurrency } from "@/lib/utils"

interface OrderItemProps {
  title: string
  image: string
  quantity: number
  price: number
}

export function OrderItem({ title, image, quantity, price }: OrderItemProps) {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-16 w-16">
        <AvatarImage src={image} alt={title} />
        <AvatarFallback>{title.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">Quantity: {quantity}</p>
      </div>
      <div className="text-right">
        <p className="font-medium">{formatCurrency(price * quantity)}</p>
        <p className="text-sm text-gray-500">{formatCurrency(price)} each</p>
      </div>
    </div>
  )
}
