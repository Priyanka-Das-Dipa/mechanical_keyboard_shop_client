"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "@/src/utilities/cards/ProductCard";
import { useGetAllProductsQuery } from "@/src/redux/features/product/productApi";
import FeaturedProductsSkeleton from "../skeleton/FeaturedProductsSkeleton";

export default function FeaturedProducts() {
  const { data, isLoading } = useGetAllProductsQuery({
    rating: 5,
  });

  const featuredProducts = data?.data?.slice(0, 6) || [];

  if (isLoading) {
    return <FeaturedProductsSkeleton />;
  }
  return (
    <div>
      <section className="py-26 px-6">
        <div className="container mx-auto">
          {/* Header with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4"
          >
            <div>
              <h2 className="text-4xl font-bold tracking-tight">
                Featured Products
              </h2>
              <p className="text-[var(--muted-text)] mt-2">
                Latest additions handpicked for you
              </p>
            </div>
            <Link
              href="/products"
              className="text-primary hover:text-primary-hover font-medium flex items-center gap-2 group"
            >
              See All Products
              <span className="group-hover:translate-x-1 transition">→</span>
            </Link>
          </motion.div>

          {/* Products Grid with Stagger Animation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6"
          >
            {featuredProducts.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
          </motion.div>

          {/* See More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <Link
              href="/products"
              className="px-10 py-4 bg-[var(--secondary-bg)] hover:bg-zinc-800 border border-[var(--border-color)] rounded-2xl text-lg font-medium transition-all hover:border-primary/50 active:scale-95"
            >
              Browse All Products
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
