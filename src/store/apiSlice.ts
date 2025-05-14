import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { CartItem, Checkout, Product } from "@/lib/types"

const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Products", "Cart"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
    prepareHeaders: headers => {
      return headers
    },
  }),
  endpoints: builder => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products",
    }),
    getProductById: builder.query<Product, string>({
      query: id => `products/${id}`,
    }),
    getCart: builder.query<CartItem[], void>({
      query: () => "cart",
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation<CartItem, { productId: string; quantity: number }>({
      query: ({ productId, quantity }) => ({
        url: "cart",
        method: "POST",
        body: { productId, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItem: builder.mutation<CartItem, { id: string; quantity: number }>({
      query: ({ id, quantity }) => ({
        url: `cart/${id}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation<void, string>({
      query: id => ({
        url: `cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    checkout: builder.mutation<Checkout, void>({
      query: () => ({
        url: "/checkout/payment",
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
})

// Export the auto-generated hooks
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useCheckoutMutation,
} = apiSlice

export default apiSlice
