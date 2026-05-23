/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { Product } from "@/src/redux/features/product/product.type";
import { useUpdateProductMutation } from "@/src/redux/features/product/productApi";
import { ProductFormData } from "@/src/utilities/shema/product.schema";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

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
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        brand: product.brand,
        price: product.price,
        currency: product.currency as "USD" | "EUR" | "GBP" | "INR" | "MYR",
        rating: product.rating,
        reviewCount: product.reviewCount,
        quantity: product.quantity,
        description: product.description,
        features: [...product.features],
        // image: null,
      });
    }
  }, [product]);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "rating" ||
        name === "reviewCount" ||
        name === "quantity"
          ? Number(value)
          : name === "currency"
            ? (value as "USD" | "EUR" | "GBP" | "INR" | "MYR")
            : value,
    }));
  };

  // Handle features
  const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      features: value.split(",").map((item) => item.trim()),
    }));
  };

  // Submit update
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!product?._id) return;

    try {
      const res = await updateProduct({
        id: product._id,
        data: formData,
      }).unwrap();
      toast.success("Product updated successfully!");
      onSuccess(res);

      onClose();
    } catch (error) {
      toast.error("Update failed");
      console.error("Update failed:", error);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-400 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Edit Product</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Name */}
          <div>
            <label className="form-label">Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="form-label">Brand</label>

            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Price */}
          <div>
            <label className="form-label">Price</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Currency</label>

            <select
              name="currency"
              value={formData.currency}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  currency: e.target.value as
                    | "USD"
                    | "EUR"
                    | "GBP"
                    | "INR"
                    | "MYR",
                }))
              }
              className="form-input"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
              <option value="MYR">MYR</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="form-label">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Description */}
          <div>
            <label className="form-label">Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="form-input"
            />
          </div>

          {/* Features */}
          <div>
            <label className="form-label">Features (comma separated)</label>

            <input
              type="text"
              value={formData.features.join(", ")}
              onChange={handleFeaturesChange}
              className="form-input"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border-blue-500 border-2 hover:text-blue-500 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
