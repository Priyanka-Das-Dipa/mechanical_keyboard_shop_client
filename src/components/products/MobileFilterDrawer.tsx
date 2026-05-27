"use client";
import { AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import ProductFilters from "./ProductFilters";

export default function MobileFilterDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  const handleApply = () => {
    console.log({
      brand,
      minPrice,
      maxPrice,
    });

    setIsOpen(false);
  };
  return (
    <>
      {/* Mobile Filter Button - Visible only on mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#0ea5e9]/30 border border-[#0ea5e9]/30 text-white p-2 rounded-2xl shadow-lg shadow-black/50 transition-all active:scale-95"
      >
        <SlidersHorizontal size={14} />
        <span className=" text-sm font-medium">Filters</span>
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 z-50 lg:hidden"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-80 bg-[var(--background)] border-r border-[var(--border-color)] z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <SlidersHorizontal className="text-primary" size={24} />
                    <h2 className="text-2xl font-bold">Filters</h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-[var(--secondary-bg)] rounded-xl transition"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Filters Content */}
                <ProductFilters
                  brand={brand}
                  setBrand={setBrand}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  setMinPrice={setMinPrice}
                  setMaxPrice={setMaxPrice}
                  onApply={handleApply}
                />

                {/* Footer Buttons */}
                <div className="sticky bottom-0 bg-[var(--background)] pt-6 mt-8 border-t border-[var(--border-color)] flex gap-3">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-4 border border-[var(--border-color)] rounded-2xl font-medium hover:bg-[var(--secondary-bg)] transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-4 bg-primary hover:bg-primary-hover rounded-2xl font-medium transition"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
