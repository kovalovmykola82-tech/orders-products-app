import { baseApi } from "@/store/api/baseApi";

export type Price = {
  id: number;
  value: string;
  symbol: string;
  isDefault: boolean;
  productId: number;
};

export type OrderProduct = {
  id: number;
  serialNumber: string;
  isNew: boolean;
  photo: string | null;
  title: string;
  type: string;
  specification: string;
  guaranteeStart: string;
  guaranteeEnd: string;
  date: string;
  orderId: number;
  prices: Price[];
};

export type Order = {
  id: number;
  title: string;
  date: string;
  description: string | null;
  products: OrderProduct[];
};

type OrdersResponse = {
  data: Order[];
};

type OrderResponse = {
  data: Order;
};

type DeleteOrderResponse = {
  message: string;
};

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => "/orders",
      transformResponse: (response: OrdersResponse) => response.data,
      providesTags: ["Orders"],
    }),

    getOrderById: builder.query<Order, number>({
      query: (id) => `/orders/${id}`,
      transformResponse: (response: OrderResponse) => response.data,
      providesTags: (_result, _error, id) => [{ type: "Orders", id }],
    }),

    deleteOrder: builder.mutation<DeleteOrderResponse, number>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders", "Products"],
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderByIdQuery, useDeleteOrderMutation } = ordersApi;
