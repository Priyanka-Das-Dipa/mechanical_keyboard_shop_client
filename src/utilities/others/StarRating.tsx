import { Star } from "lucide-react";

export const DotButton = ({
  selected,
  onClick,
}: {
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={selected ? "Current slide" : "Go to slide"}
    className={`h-1.5 rounded-full transition-all duration-500 ${
      selected ? "w-6 bg-sky-400" : "w-1.5 bg-slate-600 hover:bg-slate-400"
    }`}
  />
);
export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating
              ? "fill-sky-400 text-sky-400"
              : "fill-slate-700 text-slate-700"
          }
        />
      ))}
    </div>
  );
}
