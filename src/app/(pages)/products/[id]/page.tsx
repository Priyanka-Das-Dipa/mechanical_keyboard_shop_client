"use client";
import ImageGallery from "@/src/components/productDetails/ImageGallery";
import img1 from "../../../../../public/b1.png";
import img2 from "../../../../../public/b3.png";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import RelatedProducts from "@/src/components/productDetails/RelatedProducts";

const product = {
  id: "1",
  name: "A4 Tech Wireless Keyboard & Mouse Combo",
  brand: "A4 Tech",
  price: 1100,
  currency: "BDT",
  rating: 4.8,
  reviewCount: 124,
  quantity: 21,
  description:
    "Premium wireless keyboard and mouse combo with ergonomic design, long battery life, and reliable 2.4GHz connection.",
  features: [
    "Ergonomic Design",
    "Long Battery Life",
    "2.4GHz Wireless",
    "Plug & Play",
    "Compatible with Windows & Mac",
  ],
  images: [
    "https://images.unsplash.com/photo-1618384889247-14c2e0c7c4c4?w=800",
    "https://images.unsplash.com/photo-1587829741301-dc798e83add3?w=800",
    "https://images.unsplash.com/photo-1541140538774-9c4b8c8b5e3b?w=800",
    "https://images.unsplash.com/photo-1541140538774-9c4b8c8b5e3b?w=800",
  ],
};

export default function ProductDetailsPage() {
  return (
    <div>
      <div className="min-h-screen bg-[var(--background)] pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left Side - Image Gallery */}
            <div>
              <ImageGallery images={product.images} />
            </div>

            {/* Right Side - Product Info */}
            <div className="space-y-8">
              <div>
                <p className="text-primary font-medium">{product.brand}</p>
                <h1 className="text-4xl font-bold mt-2 leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-lg font-medium">{product.rating}</span>
                <span className="text-[var(--muted-text)]">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price & Stock */}
              <div className="flex items-end gap-3">
                <span className="text-5xl font-bold">${product.price}</span>
              </div>

              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm ${product.quantity > 0 ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}
              >
                {product.quantity > 0
                  ? `✓ In Stock (${product.quantity} available)`
                  : "Out of Stock"}
              </div>

              <p className="text-[var(--muted-text)] leading-relaxed text-lg">
                {product.description}
              </p>

              {/* Features */}
              <div>
                <h3 className="font-semibold mb-4">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-[var(--muted-text)]"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-primary hover:bg-primary-hover text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition"
                >
                  <ShoppingCart size={24} />
                  Add to Cart
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 border border-[var(--border-color)] hover:bg-[var(--secondary-bg)] py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition"
                >
                  <Heart size={24} />
                  Wishlist
                </motion.button>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mt-20">
            <RelatedProducts />
          </div>
        </div>
      </div>
    </div>
  );
}
