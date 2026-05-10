import MobileFilterDrawer from "@/src/components/products/MobileFilterDrawer";
import Pagination from "@/src/components/products/Pagination";
import ProductFilters from "@/src/components/products/ProductFilters";
import ProductGrid from "@/src/components/products/ProductGrid";
import SearchAndSort from "@/src/components/products/SearchAndSort";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">All Keyboards</h1>
          <p className="text-[var(--muted-text)] mt-2">
            Discover premium mechanical keyboards
          </p>
        </div>

        <SearchAndSort />

        <div className="flex gap-8 mt-8">
          {/* Desktop Filters - Hidden on Mobile */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <ProductFilters />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Suspense fallback={<div>Loading products...</div>}>
              <ProductGrid />
            </Suspense>
          </div>
        </div>
      </div>
      <Pagination/>

      {/* Mobile Filter Button */}
      <MobileFilterDrawer />
    </div>
  );
}
