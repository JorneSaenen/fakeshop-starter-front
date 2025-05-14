import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetOrdersQuery } from "@/store/apiSlice"
import { useState } from "react"
import { OrderList } from "@/components/orders/OrderList"
import { OrderDetails } from "@/components/orders/OrderDetails"

export default function Orders() {
  const { data: orders = [], isLoading } = useGetOrdersQuery()
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderList orders={orders} onOrderClick={setSelectedOrderId} />
        </CardContent>
      </Card>

      <OrderDetails
        orderId={selectedOrderId}
        open={!!selectedOrderId}
        onOpenChange={open => !open && setSelectedOrderId(null)}
      />
    </div>
  )
}
