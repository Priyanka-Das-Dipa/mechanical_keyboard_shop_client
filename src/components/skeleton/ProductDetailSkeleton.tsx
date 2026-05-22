import React from "react";

export default function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div>
          {/* Main Image */}
          <div className="w-full h-full rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <div className="w-full h-full rounded-xl bg-zinc-800" />
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-4 mt-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="w-24 h-24 rounded-2xl bg-zinc-900 border border-zinc-800"
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-start pt-4">
          {/* Brand */}
          <div className="w-20 h-4 bg-zinc-800 rounded mb-4" />

          {/* Title */}
          <div className="space-y-3">
            <div className="w-[80%] h-10 bg-zinc-800 rounded" />
            <div className="w-[60%] h-10 bg-zinc-800 rounded" />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 mt-6">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="w-5 h-5 rounded-full bg-zinc-700" />
              ))}
            </div>

            <div className="w-20 h-4 bg-zinc-800 rounded" />
          </div>

          {/* Price */}
          <div className="w-40 h-14 bg-zinc-800 rounded mt-8" />

          {/* Stock Badge */}
          <div className="w-40 h-10 bg-green-950 rounded-full mt-6" />

          {/* Description */}
          <div className="space-y-3 mt-8">
            <div className="w-full h-4 bg-zinc-800 rounded" />
            <div className="w-[95%] h-4 bg-zinc-800 rounded" />
            <div className="w-[90%] h-4 bg-zinc-800 rounded" />
            <div className="w-[75%] h-4 bg-zinc-800 rounded" />
          </div>

          {/* Features */}
          <div className="mt-10">
            <div className="w-32 h-5 bg-zinc-800 rounded mb-5" />

            <div className="grid grid-cols-2 gap-5">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="space-y-2">
                  <div className="w-24 h-4 bg-zinc-700 rounded" />
                  <div className="w-16 h-4 bg-zinc-800 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 mt-12">
            <div className="flex-1 h-16 rounded-2xl bg-zinc-900 border border-zinc-800" />
            <div className="flex-1 h-16 rounded-2xl bg-zinc-900 border border-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
