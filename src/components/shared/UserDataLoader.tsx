/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { setCart } from "@/src/redux/features/cart/cartSlice";
import {
  useGetCartQuery,
  useGetWishlistQuery,
} from "@/src/redux/features/user/userApi";
import { setWishlist } from "@/src/redux/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/store/hooks";
import { useEffect } from "react";

export default function UserDataLoader() {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);

  const { data: wishlistData } = useGetWishlistQuery(undefined, {
    skip: !token,
  });

  const { data: cartData } = useGetCartQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (wishlistData) {
      const formattedWishlist = wishlistData.map((product: any) => ({
        productId: product._id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image:
          product.images?.length > 0
            ? `http://localhost:5000${product.images[0]}`
            : "/b3.png",
      }));

      dispatch(setWishlist(formattedWishlist));
    }
  }, [wishlistData, dispatch]);

  // Load Cart
  useEffect(() => {
    if (cartData) {
      const formattedCart = cartData.map((item: any) => ({
        productId: item.product._id,
        name: item.product.name,
        brand: item.product.brand,
        price: item.product.price,
        quantity: item.quantity,
        image:
          item.product.images?.length > 0
            ? `http://localhost:5000${item.product.images[0]}`
            : "/b3.png",
      }));

      dispatch(setCart(formattedCart));
    }
  }, [cartData, dispatch]);
  return null;
}
