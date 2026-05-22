"use client";
import { SortOption } from "@/src/app/(pages)/products/page";
import { Search } from "lucide-react";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  value: SortOption;
  onChange: (value: SortOption) => void;
}
export default function SearchAndSort({
  searchTerm,
  setSearchTerm,
  value,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          size={20}
        />
        <input
          type="text"
          placeholder="Search keyboards, brands, switches..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[var(--secondary-bg)] border border-[var(--border-color)] pl-11 py-3.5 rounded-2xl focus:outline-none focus:border-primary transition-colors text-base"
        />
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto">
        <p className="text-sm text-[var(--muted-text)] whitespace-nowrap hidden sm:block">
          Sort By
        </p>

        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="bg-[var(--secondary-bg)] border border-[var(--border-color)] px-5 py-3.5 rounded-2xl text-sm focus:outline-none focus:border-primary"
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Best Rating</option>
        </select>
      </div>
    </div>
  );
}
