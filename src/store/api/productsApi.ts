import { baseApi } from "@/store/api/baseApi";
import type { Price } from "@/store/api/ordersApi";

export type ProductOrder = {
  id: number;
  title: string;
};

export type Product = {
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
  order: ProductOrder;
};

type ProductsResponse = {
  data: Product[];
};

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], string | undefined>({
      query: (type) => ({
        url: "/products",
        params: type ? { type } : undefined,
      }),
      transformResponse: (response: ProductsResponse) => response.data,
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
