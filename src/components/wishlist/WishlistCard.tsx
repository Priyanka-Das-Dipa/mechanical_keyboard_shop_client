"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import CartActionButton from "../shared/CartActionButton";

interface WishlistCardProps {
  productId: string;
  name: string;
  price: number;
  images: string[];
  brand: string;
  onRemove: (productId: string) => void;
  onAddToCart: (productId: string) => void;
}

export default function WishlistCard({
  productId,
  name,
  price,
  images,
  brand,
  onRemove,
  onAddToCart,
}: WishlistCardProps) {
  const imageUrl =
    images?.length > 0 ? `http://localhost:5000${images[0]}` : "/b3.png";
  return (
    <div className="w-full max-w-65 mx-auto rounded-2xl border border-black/10 bg-white overflow-hidden font-sans select-none">
      {/* Image Area */}
      <div className="relative w-full aspect-square bg-gray-100">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-contain p-2"
          sizes="(max-width: 768px) 100vw, 260px"
          unoptimized
        />

        {/* Remove from Wishlist Button */}
        <button
          onClick={() => onRemove(productId)}
          className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full border border-black/10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm"
        >
          <Heart size={16} className="text-red-500 fill-red-500" />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {brand && (
          <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-1">
            {brand}
          </p>
        )}

        <p className="font-serif text-[15.5px] leading-tight text-gray-900 mb-3 line-clamp-2 min-h-[42px]">
          {name}
        </p>

        <div className="mb-4">
          <span className="text-xl font-semibold text-gray-900">${price}</span>
        </div>

        {/* Add to Cart Button */}

        <CartActionButton
          product={{
            productId,
            name,
            brand,
            price,
            images: [imageUrl],
          }}
        />
      </div>
    </div>
  );
}
