export  interface CartItem {
  productId: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}


