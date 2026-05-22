"use client";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import StarRating from "../others/StarRating";
import { Product } from "@/src/redux/features/product/product.type";

export default function ProductCard({ product }: { product: Product }) {
  const { _id, name, brand, price, images, quantity, rating } = product;

  const imageUrl =
    images?.length > 0 ? `http://localhost:5000${images[0]}` : "/b3.png";
  
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        className="group bg-(--card-bg) hover:shadow-[0_0_30px_rgba(14,165,233,0.08)] rounded-2xl overflow-hidden "
      >
        <div
          className="group relative flex flex-col rounded-2xl overflow-hidden border border-[rgba(148,163,184,0.15)] bg-[rgba(15,23,42,0.7)] backdrop-blur-sm
      transition-all duration-300 hover:-translate-y-1 hover:border-[#0ea5e9]/40 hover:shadow-[0_0_30px_rgba(14,165,233,0.08)]"
        >
          {/* Product Image */}
          <div className="relative w-full h-52 bg-[#0f172a] overflow-hidden">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
              unoptimized
            />
            {/* Stock badge */}
            <div className="absolute top-3 right-3 z-10">
              {quantity > 0 ? (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  In Stock
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Hover overlay with action buttons */}
            <div
              className="absolute inset-0 z-20 flex items-end justify-center gap-3 p-4
          bg-liner-to-t from-[#020617]/80 via-[#020617]/30 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300"
            >
              {/* Add to Favorite */}
              <button
                // onClick={() => onAddToFavorite?.({ id, name, brand, price })}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold
            bg-[#0f172a]/80 backdrop-blur-sm text-[#f8fafc] border border-[rgba(148,163,184,0.2)]
            hover:bg-rose-500 hover:text-white hover:border-rose-500
            translate-y-3 group-hover:translate-y-0
            transition-all duration-300 ease-out delay-30"
                aria-label="Add to Favorite"
              >
                <Heart size={14} />
                Favorite
              </button>

              {/* Add to Cart */}
              <button
                // onClick={() =>
                //   onAddToCart?.({ id, name, brand, price, quantity })
                // }
                disabled={quantity === 0}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold
            bg-[#0ea5e9] text-white border border-[#0ea5e9]
            hover:bg-[#38bdf8] hover:border-[#38bdf8]
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#0ea5e9]
            translate-y-3 group-hover:translate-y-0
            transition-all duration-300 ease-out delay-60"
                aria-label="Add to Cart"
              >
                <ShoppingCart size={14} />
                Add to Cart
              </button>
            </div>
          </div>

          {/* Card Body */}
          <div className="flex flex-col flex-1 p-5 gap-3">
            {/* Brand */}
            <p className="text-xs font-semibold tracking-widest uppercase text-[#0ea5e9]">
              {brand}
            </p>

            {/* name */}
            <h3 className="text-base font-semibold text-[#f8fafc] leading-snug line-clamp-2 group-hover:text-[#38bdf8] transition-colors duration-200">
              {name}
            </h3>

            {/* Rating */}
            <StarRating rating={rating} />

            {/* Price + Quantity row */}
            <div className="flex items-center justify-between mt-auto pt-2 border-t border-[rgba(148,163,184,0.10)]">
              <span className="text-xl font-bold text-[#f8fafc]">
                ${price.toFixed(2)}
              </span>
              <span className="text-xs text-[#94a3b8]">{quantity} left</span>
            </div>

            {/* CTA Button */}
            <Link
              href={`/products/${_id}`}
              className="mt-1 w-full text-center py-2.5 rounded-xl text-sm font-semibold
          bg-[#0ea5e9]/10 text-[#0ea5e9] border border-[#0ea5e9]/30
          hover:bg-[#0ea5e9] hover:text-white hover:border-[#0ea5e9]
          transition-all duration-200"
            >
              See Details
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

{
  /* Image Container */
}
// <div className="relative h-48 w-full bg-zinc-900 overflow-hidden">
//   <motion.div
//     whileHover={{ scale: 1.08 }}
//     transition={{ duration: 0.6 }}
//   >
//     <Image src={image} alt={name} fill className="object-cover" />
//   </motion.div>

//   {quantity <= 5 && (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       className="absolute top-3 right-3 bg-red-500/90 text-white text-xs px-2.5 py-1 rounded-full"
//     >
//       Only {quantity} left
//     </motion.div>
//   )}
// </div>

// {/* Content */}
// <div className="p-5 space-y-3">
//   <div>
//     <p className="text-sm text-[var(--muted-text)]">{brand}</p>
//     <h3 className="font-semibold text-lg leading-tight line-clamp-2 mt-1">
//       {name}
//     </h3>
//   </div>

//   {/* Rating */}
//   <div className="flex items-center gap-1">
//     {Array.from({ length: 5 }).map((_, i) => (
//       <Star
//         key={i}
//         className={`w-4 h-4 ${
//           i < Math.floor(rating)
//             ? "fill-yellow-400 text-yellow-400"
//             : "text-zinc-600"
//         }`}
//       />
//     ))}
//     <span className="text-sm text-[var(--muted-text)] ml-1">
//       {rating}
//     </span>
//   </div>

//   <div className="flex items-center justify-between pt-2">
//     <span className="text-2xl font-bold text-white">
//       ${price.toFixed(2)}
//     </span>

//     <Link
//       href={`/products/${id}`}
//       className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
//     >
//       See Details
//     </Link>
//   </div>
// </div>
