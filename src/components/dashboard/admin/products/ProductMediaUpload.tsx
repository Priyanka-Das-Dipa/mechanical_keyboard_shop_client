"use client";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import React, { useCallback } from "react";

interface Props {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  imagePreviews: string[];
  setImagePreviews: React.Dispatch<React.SetStateAction<string[]>>;
}
export default function ProductMediaUpload({
  images,
  setImages,
  imagePreviews,
  setImagePreviews,
}: Props) {
  const handleFiles = (files: File[]) => {
    const total = images.length + files.length;
    if (total > 4) {
      alert("Maximum 4 images allowed");
      return;
    }

    const newFiles = files.slice(0, 4 - images.length);
    setImages((prev) => [...prev, ...newFiles]);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );
    handleFiles(files);
  }, []);

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Product Media
      </h2>

      <div
        className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-500 transition-colors cursor-pointer"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(Array.from(e.target.files || []))}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <Upload className="mx-auto w-12 h-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-700">
            Drop images here or click to upload
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Max 4 images • PNG, JPG, WebP
          </p>
        </label>
      </div>

      {imagePreviews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          {imagePreviews.map((preview, index) => (
            <div
              key={index}
              className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-square"
            >
              <Image
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
                width={500}
                height={500}
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
