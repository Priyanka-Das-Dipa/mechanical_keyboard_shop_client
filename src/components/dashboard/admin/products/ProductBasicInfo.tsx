"use client";
import {
  ProductFormData,
  ProductFormInput,
} from "@/src/utilities/shema/product.schema";
import { Plus, Star, X } from "lucide-react";
import { Controller, UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<ProductFormInput>;
  features: string[];
  setFeatures: React.Dispatch<React.SetStateAction<string[]>>;
}
export default function ProductBasicInfo({
  form,
  features,
  setFeatures,
}: Props) {
  const {
    register,
    formState: { errors },
    control,
    setValue,
    watch,
  } = form;
  const rating = Number(watch("rating") || 0);
  const addFeature = () => {
    setFeatures((prev) => [...(prev || []), ""]);
  };

  const updateFeature = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
    setValue(
      "features",
      updated.filter((f) => f.trim() !== ""),
    );
  };

  const removeFeature = (index: number) => {
    const updated = features.filter((_, i) => i !== index);
    setFeatures(updated.length ? updated : [""]);
    setValue(
      "features",
      updated.filter((f) => f.trim() !== ""),
    );
  };

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
            {...register("description")}
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
        <div>
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

      {/* Features */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="form-label">Key Features</label>
          <button
            type="button"
            onClick={addFeature}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <Plus size={18} /> Add Feature
          </button>
        </div>

        <div className="space-y-3">
          {features?.map((feature, index) => (
            <div key={index} className="flex gap-3">
              <input
                type="text"
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                className="form-input flex-1"
                placeholder="Noise cancelling technology"
              />
              {features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-red-500 hover:bg-red-50 p-3 rounded-xl"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          ))}
        </div>
        {errors.features && (
          <p className="form-error mt-2">{errors.features.message}</p>
        )}
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
                {Number(rating)}
              </span>
            </div>
          )}
        />
      </div>
    </div>
  );
}
