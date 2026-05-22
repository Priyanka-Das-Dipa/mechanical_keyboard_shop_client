export interface WishlistItem {
  productId: string;
  name: string;
  brand: string;
  price: number;
  image: string;
}

export interface WishlistState {
  items: WishlistItem[];
}

