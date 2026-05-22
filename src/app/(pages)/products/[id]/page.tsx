"use client";
import ImageGallery from "@/src/components/productDetails/ImageGallery";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import RelatedProducts from "@/src/components/productDetails/RelatedProducts";
import { useGetSingleProductQuery } from "@/src/redux/features/product/productApi";
import { useParams } from "next/navigation";
import ProductDetailSkeleton from "@/src/components/skeleton/ProductDetailSkeleton";
import { useAppDispatch, useAppSelector } from "@/src/redux/store/hooks";
import { addToCart as addToCartSlice } from "@/src/redux/features/cart/cartSlice";
import { addToWishlist as addToWishlistSlice } from "@/src/redux/features/wishlist/wishlistSlice";
import toast from "react-hot-toast";

export default function ProductDetailsPage() {
  const { id } = useParams() as { id?: string };
  const { data, isLoading, error } = useGetSingleProductQuery(id as string, {
    skip: !id,
  });
  const product = data;
  const dispatch = useAppDispatch();

  // Redux State
  const cartItems = useAppSelector((state) => state.cart?.items ?? []);

  const wishlistItems = useAppSelector((state) => state.wishlist?.items ?? []);

  // Check Exists
  const isInCart = cartItems.some((item) => item.productId === product?._id);

  const isWishlisted = wishlistItems.some(
    (item) => item.productId === product?._id,
  );

  const handleWishlist = () => {
    if (!product || isWishlisted) return;

    dispatch(
      addToWishlistSlice({
        productId: product._id,
        brand: product.brand,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
      }),
    );

    toast.success("Added to wishlist");
  };

  const handleAddToCart = () => {
    if (!product || isInCart) return;

    dispatch(
      addToCartSlice({
        productId: product._id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        quantity: 1,
        image: product.images?.[0],
      }),
    );

    toast.success("Added to cart");
  };

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }
  if (error) {
    return <p>Product not found!</p>;
  }
  return (
    <div>
      <div className="min-h-screen bg-[var(--background)] pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left Side - Image Gallery */}
            <div>
              <ImageGallery images={product?.images ?? []} />
            </div>

            {/* Right Side - Product Info */}
            <div className="space-y-8">
              <div>
                <p className="text-primary font-medium">{product?.brand}</p>
                <h1 className="text-4xl font-bold mt-2 leading-tight">
                  {product?.name}
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
                <span className="text-lg font-medium">{product?.rating}</span>
                <span className="text-[var(--muted-text)]">
                  ({product?.reviewCount} reviews)
                </span>
              </div>

              {/* Price & Stock */}
              <div className="flex items-end gap-3">
                <span className="text-5xl font-bold">${product?.price}</span>
              </div>

              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm ${(product?.quantity as number) > 0 ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}
              >
                {(product?.quantity as number) > 0
                  ? `✓ In Stock (${product?.quantity} available)`
                  : "Out of Stock"}
              </div>

              <p className="text-[var(--muted-text)] leading-relaxed text-lg">
                {product?.description}
              </p>

              {/* Features */}
              <div>
                <h3 className="font-semibold mb-4">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product?.features.map((feature: string, i: number) => (
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
                  whileHover={{ scale: isInCart ? 1 : 1.02 }}
                  whileTap={{ scale: isInCart ? 1 : 0.98 }}
                  onClick={handleAddToCart}
                  disabled={isInCart}
                  className={`flex-1 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition border ${
                    isInCart
                      ? "bg-cyan-500 text-white border-cyan-500 cursor-not-allowed"
                      : "border-[var(--border-color)] hover:bg-[var(--secondary-bg)]"
                  }`}
                >
                  <ShoppingCart size={24} />
                  {isInCart ? "Added to Cart" : "Add to Cart"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: isWishlisted ? 1 : 1.02 }}
                  whileTap={{ scale: isWishlisted ? 1 : 0.98 }}
                  onClick={handleWishlist}
                  disabled={isWishlisted}
                  className={`flex-1 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition border ${
                    isWishlisted
                      ? "bg-red-500 text-white border-red-500 cursor-not-allowed"
                      : "border-[var(--border-color)] hover:bg-[var(--secondary-bg)]"
                  }`}
                >
                  <Heart size={24} />
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mt-20">
            <RelatedProducts
              currentProductId={product?._id}
              brand={product?.brand}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
