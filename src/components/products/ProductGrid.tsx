import ProductCard from "@/src/utilities/cards/ProductCard";
import { featuredProducts } from "@/src/utilities/fakeData/ProductData";


export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
