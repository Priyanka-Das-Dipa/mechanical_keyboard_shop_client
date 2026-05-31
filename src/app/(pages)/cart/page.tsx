/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  useAddToCartMutation,
  useCheckoutMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "@/src/redux/features/user/userApi";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CartPage() {
  const { data, isLoading } = useGetCartQuery({});
  const [removeFromCart, { isLoading: removing }] = useRemoveFromCartMutation();
  const cartItems = data || [];
  const [addToCart] = useAddToCartMutation();
  const router = useRouter();
  const subtotal = cartItems.reduce(
    (total: number, item: any) => total + item.product.price * item.quantity,
    0,
  );

  const handleRemove = async (productId: string) => {
    try {
      await removeFromCart(productId).unwrap();

      toast.success("Removed from cart");
    } catch (error) {
      console.error(error);

      toast.error("Failed to remove");
    }
  };
  const handleIncreaseQuantity = async (productId: string) => {
    try {
      await addToCart({
        productId,
        quantity: 1,
      }).unwrap();

      toast.success("Quantity updated");
    } catch (error) {
      console.error(error);

      toast.error("Failed to update quantity");
    }
  };

  const handleDecreaseQuantity = async (
    productId: string,
    currentQuantity: number,
  ) => {
    try {
      // If only 1 item -> remove completely
      if (currentQuantity === 1) {
        await removeFromCart(productId).unwrap();

        toast.success("Removed from cart");

        return;
      }

      // Otherwise decrease quantity
      await addToCart({
        productId,
        quantity: -1,
      }).unwrap();

      toast.success("Quantity updated");
    } catch (error) {
      console.error(error);

      toast.error("Failed to update quantity");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold">Loading Cart...</h2>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-14">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">
        <div>
          <div className="hidden md:grid grid-cols-[80px_1.5fr_150px_150px_150px] border-b pb-5 text-lg font-medium">
            <h3></h3>
            <h3>PRODUCT</h3>

            <h3>PRICE</h3>

            <h3>QUANTITY</h3>

            <h3>SUBTOTAL</h3>
          </div>

          {/* Items */}
          <div className="divide-y">
            {cartItems.map((item: any) => (
              <div
                key={item?._id}
                className="grid grid-cols-1 md:grid-cols-[80px_1.5fr_150px_150px_150px] gap-5 items-center py-8"
              >
                {/* Remove */}
                <button
                  disabled={removing}
                  onClick={() => handleRemove(item?.product?._id)}
                  className="text-gray-500 hover:text-red-500 transition"
                >
                  <X />
                </button>

                {/* Product */}
                <div className="flex items-center gap-5">
                  <Image
                    src={
                      item?.product?.images?.length > 0
                        ? `https://mechanical-keyboard-shop-server-ea2u.onrender.com${item.product.images[0]}`
                        : "/b3.png"
                    }
                    alt={item?.product?.name}
                    className="w-20 h-20 rounded-lg object-cover"
                    width={100}
                    height={100}
                    unoptimized
                  />

                  <div>
                    <h3 className="text-xl font-medium">
                      {item?.product?.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {item?.product?.brand}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="text-lg font-medium">
                  {item?.product?.currency} {item?.product?.price}
                </div>

                {/* Quantity */}
                <div>
                  <div className="flex items-center border w-fit rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        handleDecreaseQuantity(
                          item?.product?._id,
                          item?.quantity,
                        )
                      }
                      className="px-4 py-3 text-lg border-r hover:bg-gray-100 transition"
                    >
                      -
                    </button>

                    <span className="px-5 font-medium">{item?.quantity}</span>

                    <button
                      onClick={() => handleIncreaseQuantity(item?.product?._id)}
                      className="px-4 py-3 text-lg border-l hover:bg-gray-100 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="text-xl font-semibold">
                  {item?.product?.currency}{" "}
                  {item?.product?.price * item?.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="border rounded-xl p-8 h-fit">
          <h2 className="text-4xl font-semibold mb-10">CART TOTALS</h2>

          <div className="space-y-8">
            {/* Subtotal */}
            <div className="flex items-center justify-between border-b pb-5">
              <span className="text-xl">Subtotal</span>
              <p className="text-2xl font-medium">
                <span className="text-sm"> USD </span>
                {subtotal}
              </p>
            </div>

            {/* Shipping */}
            <div className="flex items-start justify-between border-b pb-5">
              <span className="text-xl">Shipment</span>

              <div className="text-right max-w-[240px]">
                <p className="text-lg font-medium">Free Shipping</p>

                <p className="text-gray-500 mt-2">
                  Shipping options will be updated during checkout.
                </p>

                <button className="mt-3 font-semibold">
                  Calculate shipping
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-2xl">Total</span>

              <span className="text-xl">Subtotal</span>
              <p className="text-2xl font-medium">
                <span className="text-sm"> USD </span>
                {subtotal}
              </p>
            </div>

            {/* Checkout */}
            <button
              onClick={() => router.push("/checkout")}
              className="w-full bg-black hover:bg-gray-900 transition text-white py-5 text-lg font-semibold rounded-lg"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
