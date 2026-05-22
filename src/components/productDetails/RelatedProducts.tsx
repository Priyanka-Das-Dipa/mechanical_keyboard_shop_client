import { useGetAllProductsQuery } from "@/src/redux/features/product/productApi";
import ProductCard from "@/src/utilities/cards/ProductCard";

interface Props {
  brand?: string;
  currentProductId?: string;
}
export default function RelatedProducts({ brand, currentProductId }: Props) {
  const { data, isLoading } = useGetAllProductsQuery({
    brand,
    limit: 4,
    page: 1,
  });

  if (isLoading) {
    return <p>Loading related products...</p>;
  }
  const relatedProducts =
    data?.data?.filter((product) => product._id !== currentProductId) || [];

  if (relatedProducts.length === 0) {
    return null;
  }
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">More from </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
