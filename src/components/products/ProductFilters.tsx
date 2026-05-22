import { useGetBrandsQuery } from "@/src/redux/features/product/productApi";

interface Props {
  brand: string;
  setBrand: (value: string) => void;

  minPrice?: number;
  maxPrice?: number;

  setMinPrice: (value: number | undefined) => void;
  setMaxPrice: (value: number | undefined) => void;

  onApply: () => void;
}

export default function ProductFilters({
  brand,
  setBrand,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  onApply,
}: Props) {
  const { data: brands = [] } = useGetBrandsQuery();
  
  const toggleBrand = (value: string) => {
    if (brand === value) {
      setBrand(""); // unselect
    } else {
      setBrand(value); // single select
    }
  };

  return (
    <div className="sticky top-6 space-y-8">
      <h3 className="font-semibold text-xl">Filters</h3>

      {/* Brands */}
      <div>
        <h4 className="font-medium mb-4">Brands</h4>
        <div className="space-y-3">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={brand === b}
                onChange={() => toggleBrand(b)}
                className="w-5 h-5 accent-primary"
              />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-4">Price Range</h4>
        <div className="flex gap-4">
          <input
            type="number"
            value={minPrice || ""}
            onChange={(e) =>
              setMinPrice(
                Number(e.target.value ? Number(e.target.value) : undefined),
              )
            }
            placeholder="Min"
            className="bg-[var(--secondary-bg)] border border-[var(--border-color)] rounded-xl px-4 py-2 w-full"
          />
          <input
            type="number"
            value={maxPrice || ""}
            onChange={(e) =>
              setMaxPrice(
                Number(e.target.value ? Number(e.target.value) : undefined),
              )
            }
            placeholder="Max"
            className="bg-[var(--secondary-bg)] border border-[var(--border-color)] rounded-xl px-4 py-2 w-full"
          />
        </div>
      </div>

      {/* In Stock Only */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          className="w-5 h-5 accent-primary"
          defaultChecked
        />
        <span>In Stock Only</span>
      </label>

      <button
        onClick={onApply}
        className="w-full cursor-pointer py-3 bg-[#0ea5e9]/10 border border-[#0ea5e9]/30 rounded-2xl font-medium transition"
      >
        Apply Filters
      </button>
    </div>
  );
}
