import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Product, CartItem, CheckoutResponse, Order, OrderWithProduct } from "@/lib/types"

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
    prepareHeaders: headers => {
      return headers
    },
  }),
  tagTypes: ["Cart"],
  endpoints: builder => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products",
    }),
    getProductById: builder.query<Product, Product["_id"]>({
      query: id => `products/${id}`,
    }),
    getCart: builder.query<CartItem[], void>({
      query: () => "cart",
      providesTags: ["Cart"],
    }),
    getOrders: builder.query<Order[], void>({
      query: () => "orders",
    }),
    getOrderById: builder.query<OrderWithProduct, Order["_id"]>({
      query: id => `orders/${id}`,
    }),
    addToCart: builder.mutation<CartItem, { productId: string; quantity: number }>({
      query: ({ productId, quantity }) => ({
        url: "cart",
        method: "POST",
        body: { productId, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItem: builder.mutation<void, { id: CartItem["_id"]; quantity: number }>({
      query: ({ id, quantity }) => ({
        url: `cart/${id}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation<void, CartItem["_id"]>({
      query: id => ({
        url: `cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    checkout: builder.mutation<CheckoutResponse, void>({
      query: () => ({
        url: "checkout/payment",
        method: "POST",
      }),
    }),
  }),
})

// Export the auto-generated hooks
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCartQuery,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useCheckoutMutation,
} = apiSlice

export default apiSlice
