"use client";
import { ProductFormData } from "@/src/utilities/shema/product.schema";
import { Star } from "lucide-react";
import { Controller, UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<ProductFormData>;
}
export default function ProductBasicInfo({ form }: Props) {
  const {
    register,
    formState: { errors },
    control,
    setValue,
    watch,
  } = form;
  const rating = watch("rating");

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="form-label">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            className="form-input"
            placeholder="Sony WH-1000XM5"
          />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="form-label">
            Product Description <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("name")}
            className="form-input"
            placeholder="Write a description..."
          />
          {errors.description && (
            <p className="form-error">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">
            Brand <span className="text-red-500">*</span>
          </label>
          <input
            {...register("brand")}
            className="form-input"
            placeholder="Sony"
          />
          {errors.brand && <p className="form-error">{errors.brand.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className="form-input "
            />
            {errors.price && (
              <p className="form-error">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Currency</label>
            <select {...register("currency")} className="form-input bg-white">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
              <option value="MYR">MYR (RM)</option>
            </select>
          </div>
        </div>

        {/* Review Count */}
        <div>
          <label className="form-label">Review Count</label>
          <input
            type="number"
            {...register("reviewCount", { valueAsNumber: true })}
            className="form-input"
            placeholder="245"
          />
        </div>

        {/* Quantity */}
        <div >
          <label className="form-label">
            Stock Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register("quantity", { valueAsNumber: true })}
            className="form-input"
            placeholder="150"
          />
          {errors.quantity && (
            <p className="form-error">{errors.quantity.message}</p>
          )}
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="form-label">Rating (Out of 5)</label>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={34}
                  className={`cursor-pointer transition-colors ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => field.onChange(star)}
                />
              ))}
              <span className="ml-4 text-2xl font-semibold text-gray-700">
                {rating}
              </span>
            </div>
          )}
        />
      </div>
    </div>
  );
}
