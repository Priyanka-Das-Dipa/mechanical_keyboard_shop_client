/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "./product.type";
import { BASE_URL } from "../../lib/api";
import { RootState } from "../../store/store";


export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth?.token;

      console.log("🔑 Current Token:", token ? "✅ FOUND" : "❌ MISSING");

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    createProduct: builder.mutation<Product, FormData>({
      query: (formData) => ({
        url: '/product',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useCreateProductMutation } = productApi;
