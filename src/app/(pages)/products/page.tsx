"use client";
import MobileFilterDrawer from "@/src/components/products/MobileFilterDrawer";
import Pagination from "@/src/components/products/Pagination";
import ProductFilters from "@/src/components/products/ProductFilters";
import ProductGrid from "@/src/components/products/ProductGrid";
import SearchAndSort from "@/src/components/products/SearchAndSort";
import AllProductsSkeleton from "@/src/components/skeleton/AllProductsSkeleton";
import { useGetAllProductsQuery } from "@/src/redux/features/product/productApi";
import { Suspense, useMemo, useState } from "react";

export type SortOption = "newest" | "price-low" | "price-high" | "rating";

export type SortParams = {
  sortBy: "createdAt" | "price" | "rating";
  order: "asc" | "desc";
};

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [applyFilter, setApplyFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOption>("newest");
  const limit = 6;

  const sortParams = useMemo<SortParams>(() => {
    switch (sort) {
      case "newest":
        return {
          sortBy: "createdAt",
          order: "desc",
        };

      case "price-low":
        return {
          sortBy: "price",
          order: "asc",
        };

      case "price-high":
        return {
          sortBy: "price",
          order: "desc",
        };

      case "rating":
        return {
          sortBy: "rating",
          order: "desc",
        };

      default:
        return {
          sortBy: "createdAt",
          order: "desc",
        };
    }
  }, [sort]);

  const { data, isLoading, error } = useGetAllProductsQuery({
    searchTerm,
    brand,
    minPrice,
    maxPrice,
    page,
    limit,
    sortBy: sortParams.sortBy,
    order: sortParams.order,
    applyFilter,
  });

  return (
    <div className="min-h-screen bg-background)">
      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">All Keyboards</h1>
          <p className="text-(--muted-text) mt-2">
            Discover premium mechanical keyboards
          </p>
        </div>

        <SearchAndSort
          value={sort}
          onChange={setSort}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="flex gap-8 mt-8">
          {/* Desktop Filters - Hidden on Mobile */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <ProductFilters
              brand={brand}
              setBrand={setBrand}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              onApply={() => {
                setPage(1);
                setApplyFilter(!applyFilter);
              }}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Suspense fallback={<AllProductsSkeleton />}>
              <ProductGrid data={data} isLoading={isLoading} error={error} />
            </Suspense>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={data?.meta?.totalPage || 1}
      />

      {/* Mobile Filter Button */}
      <MobileFilterDrawer />
    </div>
  );
}
