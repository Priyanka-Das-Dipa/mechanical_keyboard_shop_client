import { useAddToCartMutation } from "@/src/redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "@/src/redux/store/hooks";
import toast from "react-hot-toast";
import { addToCart as addToCartSlice } from "@/src/redux/features/cart/cartSlice";
import { ShoppingCart } from "lucide-react";
interface CartActionButtonProps {
  product: {
    productId: string;
    name: string;
    brand: string;
    price: number;
    images: string[];
  };
}
export default function CartActionButton({ product }: CartActionButtonProps) {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);

  const existingCartItem = cartItems.find(
    (item) => item.productId === product.productId,
  );

  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = async () => {
    try {
      await addToCart({
        productId: product.productId,
        quantity: 1,
      }).unwrap();

      dispatch(
        addToCartSlice({
          productId: product.productId,
          name: product.name,
          brand: product.brand,
          price: product.price,
          quantity: 1,
          image:
            product.images?.length > 0
              ? `http://localhost:5000${product.images[0]}`
              : "/b3.png",
        }),
      );

      toast.success("Cart updated");
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };
  return (
    <button
      onClick={handleAddToCart}
      className={`px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition-all duration-300 ease-out ${
        existingCartItem
          ? "bg-cyan-500 text-white"
          : "bg-[#0ea5e9] text-white border border-[#0ea5e9] hover:bg-[#38bdf8] hover:text-white hover:border-[#38bdf8] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#0ea5e9]"
      }`}
    >
      <ShoppingCart size={14} />

      {existingCartItem ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}
