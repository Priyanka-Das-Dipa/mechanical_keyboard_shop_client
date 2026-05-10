import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination() {
  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button className="p-3 rounded-xl border border-[var(--border-color)] hover:bg-[var(--secondary-bg)]">
        <ChevronLeft size={20} />
      </button>

      {[1, 2, 3, 4, 5].map((page) => (
        <button
          key={page}
          className={`px-5 py-3 rounded-xl font-medium ${
            page === 1
              ? "bg-primary text-white"
              : "border border-[var(--border-color)] hover:bg-[var(--secondary-bg)]"
          }`}
        >
          {page}
        </button>
      ))}

      <button className="p-3 rounded-xl border border-[var(--border-color)] hover:bg-[var(--secondary-bg)]">
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
