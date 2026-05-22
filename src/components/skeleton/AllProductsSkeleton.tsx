import React from "react";

export default function AllProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-[#17171b] border border-gray-800 rounded-3xl overflow-hidden"
        >
          {/* Image Skeleton */}
          <div className="relative h-52 bg-gray-800 animate-pulse">
            <div className="absolute top-4 right-4 h-6 w-20 bg-gray-900/80 rounded-lg animate-pulse" />
          </div>

          {/* Content Skeleton */}
          <div className="p-6 space-y-5">
            {/* Brand */}
            <div className="h-3 w-16 bg-gray-700 rounded animate-pulse" />

            {/* Product Name */}
            <div className="space-y-2">
              <div className="h-5 w-[85%] bg-gray-700 rounded animate-pulse" />
              <div className="h-5 w-[60%] bg-gray-700 rounded animate-pulse" />
            </div>

            {/* Stars */}
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <div
                  key={j}
                  className="w-4 h-4 bg-gray-700 rounded animate-pulse"
                />
              ))}
            </div>

            {/* Price & Button */}
            <div className="flex items-center justify-between pt-4">
              <div className="h-9 w-24 bg-gray-700 rounded-xl animate-pulse" />
              <div className="h-11 w-36 bg-gray-700 rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
