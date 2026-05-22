/* eslint-disable @typescript-eslint/no-explicit-any */

import ProductCard from "@/src/utilities/cards/ProductCard";
import AllProductsSkeleton from "../skeleton/AllProductsSkeleton";
import { Product } from "@/src/redux/features/product/product.type";

interface Props {
  data?: {
    data: Product[];
  };
  isLoading: boolean;
  error: any;
}
export default function ProductGrid({ data, isLoading, error }: Props) {
  if (isLoading) {
    return <AllProductsSkeleton />;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }
  if (!data?.data?.length) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-zinc-400 text-lg">No products found</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.data?.map((product) => (
        <ProductCard key={product?._id} product={product} />
      ))}
    </div>
  );
}
