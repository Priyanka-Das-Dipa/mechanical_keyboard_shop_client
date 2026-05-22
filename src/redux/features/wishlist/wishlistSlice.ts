import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishlistItem, WishlistState } from "./wishlist.type";

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.find(
        (item) => item.productId === action.payload.productId,
      );

      if (!exists) {
        state.items.push(action.payload);
      }
    },

    
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload,
      );
    },

    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWishlist, getAllWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
