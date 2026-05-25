/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  useCheckoutMutation,
  useGetCartQuery,
} from "@/src/redux/features/user/userApi";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { data } = useGetCartQuery({});

  const cartItems = data || [];

  const [checkout, { isLoading }] = useCheckoutMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const subtotal = cartItems.reduce(
    (total: number, item: any) => total + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.phone
    ) {
      toast.error("Please fill all fields");

      return;
    }

    try {
      const res = await checkout().unwrap();

      if (res?.url) {
        window.location.href = res.url;
      }
    } catch (error) {
      console.error(error);

      toast.error("Checkout failed");
    }
  };
  return (
    <section className="container mx-auto px-4 py-14">
      <h1 className="text-4xl font-bold mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT */}
        <div className=" p-8">
          <h2 className="text-2xl font-semibold mb-8">User Info</h2>

          <div className="space-y-6">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-4"
            />

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-4"
            />

            <input
              type="text"
              placeholder="Delivery Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-4"
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
              className="w-full border rounded-lg px-4 py-4"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="border rounded-xl p-8 h-fit">
          <h2 className="text-2xl font-semibold mb-8">Order Summary</h2>

          <div className="space-y-5">
            {cartItems.map((item: any) => (
              <div
                key={item.product._id}
                className="flex justify-between border-b pb-4"
              >
                <div>
                  <h3 className="font-medium">{item.product.name}</h3>

                  <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                </div>

                <p className="font-semibold">
                  USD {item.product.price * item.quantity}
                </p>
              </div>
            ))}

            <div className="flex justify-between text-2xl font-bold pt-5">
              <span>Total</span>

              <span>USD {subtotal}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full mt-8 bg-black hover:bg-gray-900 transition text-white py-5 text-lg font-semibold rounded-lg"
            >
              {isLoading ? "Redirecting..." : "CONFIRM CHECKOUT"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
