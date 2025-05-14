import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Order } from "@/lib/types"

const statusColors = {
  confirmed: "bg-yellow-500",
  paid: "bg-blue-500",
  shipped: "bg-purple-500",
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
}

interface OrderListProps {
  orders: Order[]
  onOrderClick: (orderId: string) => void
}

export function OrderList({ orders, onOrderClick }: OrderListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map(order => (
          <TableRow key={order._id} className="cursor-pointer hover:bg-gray-50" onClick={() => onOrderClick(order._id)}>
            <TableCell className="font-medium">{order._id}</TableCell>
            <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>{order.products.length} items</TableCell>
            <TableCell>
              <Badge className={`${statusColors[order.status]} text-white`}>{order.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
        {orders.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No orders found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
