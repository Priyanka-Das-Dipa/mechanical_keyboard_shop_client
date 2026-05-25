/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../lib/api";
import { RootState } from "../../store/store";

export const userApi = createApi({
  reducerPath: "userApi",

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

  tagTypes: ["Wishlist", "Cart"],

  endpoints: (builder) => ({
    // WISHLIST
    getWishlist: builder.query<any[], void>({
      query: () => "/user/wishlist",
      providesTags: ["Wishlist"],
    }),

    addToWishlist: builder.mutation({
      query: (productId: string) => ({
        url: `/user/wishlist/${productId}`,
        method: "POST",
      }),
      invalidatesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation({
      query: (productId: string) => ({
        url: `/user/wishlist/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),

    // CART

    getCart: builder.query({
      query: () => "/user/cart",

      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
      query: ({
        productId,
        quantity,
      }: {
        productId: string;
        quantity: number;
      }) => ({
        url: "/user/cart",
        method: "POST",
        body: {
          productId,
          quantity,
        },
      }),

      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation({
      query: (productId: string) => ({
        url: `/user/cart/${productId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Cart"],
    }),

    // CHECKOUT
    checkout: builder.mutation<
      { url: string },
      {
        customerName: string;
        customerEmail: string;
        customerPhone: string;
        deliveryAddress: string;
      }
    >({
      query: (data) => ({
        url: "/user/checkout",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useCheckoutMutation,
} = userApi;
