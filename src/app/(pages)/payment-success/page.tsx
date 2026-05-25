"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();

  const router = useRouter();

  useEffect(() => {
    toast.success("Payment successful!");

    const timeout = setTimeout(() => {
      router.push("/products");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-green-600">
          Payment Successful
        </h1>

        <p className="text-lg text-gray-600">
          Thank you for shopping with KeyCraft.
        </p>
      </div>
    </div>
  );
}
