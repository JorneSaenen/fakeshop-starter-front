import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { OrderItem } from "./OrderItem"
import { formatCurrency } from "@/lib/utils"
import { useGetOrderByIdQuery } from "@/store/apiSlice"
import { Skeleton } from "@/components/ui/skeleton"

const statusColors = {
  confirmed: "bg-yellow-500",
  paid: "bg-blue-500",
  shipped: "bg-purple-500",
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
} as const

type OrderStatus = keyof typeof statusColors

interface OrderDetailsProps {
  orderId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OrderDetails({ orderId, open, onOpenChange }: OrderDetailsProps) {
  const { data: order, isLoading } = useGetOrderByIdQuery(orderId!, {
    skip: !orderId,
  })

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            {/* View detailed information about your order, including items, quantities, and total amount. */}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-8 w-1/2" />
              <Separator />
              <div className="space-y-4">
                <Skeleton className="h-6 w-1/4" />
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            </div>
          ) : order ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium">{order._id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge className={`${statusColors[order.status as OrderStatus]} text-white`}>{order.status}</Badge>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-medium">{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-medium">Order Items</h3>
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {order.products.map((item, index: number) => (
                      <OrderItem
                        key={index}
                        title={item.productId.title}
                        image={item.productId.images[0]}
                        quantity={item.quantity}
                        price={item.productId.price}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>
              <Separator />
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-xl font-bold">
                  {formatCurrency(
                    order.products.reduce((total: number, item) => total + item.productId.price * item.quantity, 0),
                  )}
                </p>
              </div>
            </div>
          ) : null}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
