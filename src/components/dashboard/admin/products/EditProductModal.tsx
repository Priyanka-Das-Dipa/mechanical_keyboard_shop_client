/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import { Product, ProductFormData } from "@/src/utilities/types/product.type";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onSuccess: (product: Product) => void;
}

export default function EditProductModal({
  isOpen,
  product,
  onClose,
  onSuccess,
}: Props) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    brand: "",
    price: 0,
    currency: "INR",
    rating: 0,
    reviewCount: 0,
    quantity: 0,
    description: "",
    features: [],
    image: null,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        brand: product.brand,
        price: product.price,
        currency: product.currency,
        rating: product.rating,
        reviewCount: product.reviewCount,
        quantity: product.quantity,
        description: product.description,
        features: [...product.features],
        image: null,
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    // Call your API
    const res = await fetch(`/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const updated = await res.json();
      onSuccess(updated);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold">Edit Product</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Add your form fields here (name, brand, price, currency, quantity, etc.) */}
          {/* You can use a form library like react-hook-form + zod for production */}

          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
