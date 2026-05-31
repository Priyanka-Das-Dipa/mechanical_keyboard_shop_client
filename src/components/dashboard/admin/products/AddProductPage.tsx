/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  ProductFormInput,
  productSchema,
} from "@/src/utilities/shema/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ProductBasicInfo from "./ProductBasicInfo";
import ProductMediaUpload from "./ProductMediaUpload";
import { useCreateProductMutation } from "@/src/redux/features/product/productApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppSelector } from "@/src/redux/store/hooks";

export default function AddProductPage() {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([""]);

  const [createProduct, { isLoading }] = useCreateProductMutation();
  const router = useRouter();

  const { token, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    console.log("Auth State:", {
      token: token ? "Present" : "Missing",
      isAuthenticated,
    });
  }, [token, isAuthenticated]);

  const form = useForm<ProductFormInput>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      brand: "",
      description: "",
      price: 0,
      rating: 0,
      reviewCount: 0,
      quantity: 0,
      currency: "USD",
      features: [],
    },
  });

  const onSubmit: SubmitHandler<ProductFormInput> = async (data) => {
    if (!images.length) {
      toast.error("Please upload images");
      return;
    }

    if (!token) {
      toast.error("Login required");
      router.push("/login");
      return;
    }

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("description", data.description);
    formData.append("currency", data.currency);

    formData.append("price", String(data.price));
    formData.append("rating", String(data.rating));
    formData.append("reviewCount", String(data.reviewCount));
    formData.append("quantity", String(data.quantity));

    formData.append("features", JSON.stringify(data.features));

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      await createProduct(formData).unwrap();

      toast.success("Product created successfully");

      form.reset();
      setImages([]);
      setImagePreviews([]);
      setFeatures([""]);

      router.push("/dashboard/all-product");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create product");
    }
  };

  return (
    <div className="min-h-[90vh] px-4">
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
