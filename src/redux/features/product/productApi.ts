/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetProductsQuery, Product, ProductsResponse } from "./product.type";
import { BASE_URL } from "../../lib/api";
import { RootState } from "../../store/store";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    createProduct: builder.mutation<Product, FormData>({
      query: (formData) => ({
        url: "/product",
        method: "POST",
        body: formData,
      }),
    }),

    // GET ALL PRODUCTS
    getAllProducts: builder.query<ProductsResponse, GetProductsQuery>({
      query: ({
        searchTerm = "",
        brand = "",
        minPrice,
        maxPrice,
        page = 1,
        limit = 6,
        sortBy = "createdAt",
        order = "desc",
        rating
      }) => {
        const params = new URLSearchParams();

        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }
        if (rating !== undefined) {
          params.append("rating", String(rating));
        }
        if (brand) {
          params.append("brand", brand);
        }

        if (minPrice !== undefined) {
          params.append("minPrice", String(minPrice));
        }

        if (maxPrice !== undefined) {
          params.append("maxPrice", String(maxPrice));
        }

        params.append("page", String(page));

        params.append("limit", String(limit));
        params.append("sortBy", sortBy);

        params.append("order", order);

        return `/product?${params.toString()}`;
      },

      providesTags: ["Products"],
    }),

    // GET SINGLE PRODUCT
    getSingleProduct: builder.query<Product, string>({
      query: (id) => `/product/${id}`,

      providesTags: ["Products"],
    }),

    // UPDATE PRODUCT
    updateProduct: builder.mutation<
      Product,
      {
        id: string;

        data: Partial<Product>;
      }
    >({
      query: ({ id, data }) => ({
        url: `/product/${id}`,

        method: "PATCH",

        body: data,
      }),

      invalidatesTags: ["Products"],
    }),

    // DELETE PRODUCT
    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/product/${id}`,

        method: "DELETE",
      }),

      invalidatesTags: ["Products"],
    }),

    getBrands: builder.query<string[], void>({
      query: () => "/product/brands",
      transformResponse: (response: any) => {
        return response; // OR response.data depending on backend
      },
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetBrandsQuery,
} = productApi;
