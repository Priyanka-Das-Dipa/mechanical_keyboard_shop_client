import { ChevronLeft, ChevronRight } from "lucide-react";
interface Props {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}
export default function Pagination({ page, setPage, totalPages }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button
        onClick={() => setPage(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="p-3 rounded-xl border border-[var(--border-color)] hover:bg-[var(--secondary-bg)]"
      >
        <ChevronLeft size={20} />
      </button>

      {pages.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => setPage(pageNum)}
          className={`px-5 py-3 rounded-xl font-medium transition-all ${
            page === pageNum
              ? "border border-[var(--border-color)] bg-[var(--secondary-bg)]"
              : "border border-[var(--border-color)] hover:bg-[var(--secondary-bg)]"
          }`}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => setPage(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        className="p-3 rounded-xl border border-[var(--border-color)] hover:bg-[var(--secondary-bg)]"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
