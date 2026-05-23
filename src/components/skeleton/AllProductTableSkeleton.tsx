import React from "react";

export default function AllProductTableSkeleton() {
  return (
    <div className="w-full bg-white rounded-2xl border overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-7 gap-4 px-6 py-5 border-b bg-gray-50">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="h-4 w-20 bg-gray-200 rounded animate-pulse"
          />
        ))}
      </div>

      {/* Table Body */}
      {Array.from({ length: 8 }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-7 gap-4 items-center px-6 py-6 border-b"
        >
          {/* No */}
          <div className="h-4 w-6 bg-gray-200 rounded animate-pulse" />

          {/* Name */}
          <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />

          {/* Image */}
          <div className="h-14 w-14 bg-gray-200 rounded-lg animate-pulse" />

          {/* Brand */}
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />

          {/* Quantity */}
          <div className="h-5 w-12 bg-gray-200 rounded animate-pulse" />

          {/* Price */}
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />

          {/* Actions */}
          <div className="flex gap-3">
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
