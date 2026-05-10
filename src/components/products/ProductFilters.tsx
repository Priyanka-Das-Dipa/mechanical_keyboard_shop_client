export default function ProductFilters() {
  const brands = [
    "Keychron",
    "NuPhy",
    "Wooting",
    "Akko",
    "Mode",
    "Leopold",
    "Gateron",
  ];
  const layouts = ["Full Size", "TKL", "75%", "65%", "60%", "Alice"];
  return (
    <div className="sticky top-6 space-y-8">
      <h3 className="font-semibold text-xl">Filters</h3>

      {/* Brands */}
      <div>
        <h4 className="font-medium mb-4">Brands</h4>
        <div className="space-y-3">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input type="checkbox" className="w-5 h-5 accent-primary" />
              <span>{brand}</span>
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
            placeholder="Min"
            className="bg-[var(--secondary-bg)] border border-[var(--border-color)] rounded-xl px-4 py-2 w-full"
          />
          <input
            type="number"
            placeholder="Max"
            className="bg-[var(--secondary-bg)] border border-[var(--border-color)] rounded-xl px-4 py-2 w-full"
          />
        </div>
      </div>

      {/* Layout */}
      <div>
        <h4 className="font-medium mb-4">Layout</h4>
        <div className="space-y-3">
          {layouts.map((layout) => (
            <label
              key={layout}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input type="checkbox" className="w-5 h-5 accent-primary" />
              <span>{layout}</span>
            </label>
          ))}
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

      <button className="w-full cursor-pointer py-3 bg-[#0ea5e9]/10 border border-[#0ea5e9]/30 rounded-2xl font-medium transition">
        Apply Filters
      </button>
    </div>
  );
}
