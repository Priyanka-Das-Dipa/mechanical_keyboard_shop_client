/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAppSelector } from "@/src/redux/store/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: any[];
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
}: CartSidebarProps) {
  const router = useRouter();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const handleViewCart = () => {
    onClose();

    // NOT LOGGED IN
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    router.push("/cart");
  };
  return (
    <div
      className={`fixed inset-0 z-[99999] transition-all duration-300 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/50" />

      {/* Sidebar */}
      <div
        className={`absolute top-0 right-0 h-screen w-full sm:w-[420px] bg-slate-950 border-l border-slate-800 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <h2 className="text-xl font-semibold text-white">Shopping Cart</h2>

          <button
            onClick={onClose}
            className="text-2xl text-white hover:text-cyan-400"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex flex-col gap-4 p-5 overflow-y-auto h-[calc(100vh-160px)]">
          {cartItems?.length > 0 ? (
            cartItems?.map((item) => (
              <div
                key={item?._id}
                className="flex items-center gap-4 border border-slate-800 rounded-xl p-3"
              >
                <Image
                  src={
                    item?.product?.images?.length > 0
                      ? `https://mechanical-keyboard-shop-server-ea2u.onrender.com${item.product.images[0]}`
                      : "/b3.png"
                  }
                  alt={item?.product?.name}
                  className="w-20 h-20 rounded-lg object-cover"
                  width={80}
                  height={80}
                  unoptimized
                />

                <div className="flex-1">
                  <h3 className="text-white font-medium line-clamp-1">
                    {item?.product?.name}
                  </h3>

                  <p className="text-sm text-gray-400">
                    Qty: {item?.product?.quantity}
                  </p>

                  <p className="text-cyan-400 font-semibold">
                    {item?.product?.currency} {item?.product?.price}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Your cart is empty
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full border-t border-slate-800 p-5 bg-slate-950">
          {/* <Link
            href="/cart"
            onClick={onClose}
            className="flex items-center justify-center w-full rounded-xl bg-blue-500 py-3 font-semibold text-black hover:bg-cyan-400 transition"
          >
            View Cart
          </Link> */}
          <button
            onClick={handleViewCart}
            className="flex items-center justify-center w-full rounded-xl bg-blue-500 py-3 font-semibold text-black hover:bg-cyan-400 transition"
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
}
