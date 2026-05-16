"use client";
import {
  ProductFormData,
  productSchema,
} from "@/src/utilities/shema/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ProductBasicInfo from "./ProductBasicInfo";
import ProductMediaUpload from "./ProductMediaUpload";

export default function AddProductPage() {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([""]);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      brand: "",
      price: 0,
      currency: "USD",
      rating: 0,
      reviewCount: 0,
      quantity: 0,
      description: "",
      features: [],
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    const payload = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) value.forEach((v) => payload.append(key, v));
      else payload.append(key, String(value));
    });

    images.forEach((img) => payload.append("images", img));

    console.log("Submitting Product:", data);
    // Call your API here
    alert("Product created successfully!");
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600 mt-2">Fill all required information</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          <ProductBasicInfo
            form={form}
            features={features}
            setFeatures={setFeatures}
          />
          <ProductMediaUpload
            images={images}
            setImages={setImages}
            imagePreviews={imagePreviews}
            setImagePreviews={setImagePreviews}
          />

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl text-lg transition-all shadow-lg active:scale-[0.97]"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
