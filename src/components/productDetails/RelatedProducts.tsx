import ProductCard from "@/src/utilities/cards/ProductCard";
import { featuredProducts } from "@/src/utilities/fakeData/ProductData";


export default function RelatedProducts() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">More from </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
