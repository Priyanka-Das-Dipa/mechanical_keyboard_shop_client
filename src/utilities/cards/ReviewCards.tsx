import Image from "next/image";
import { Review } from "../interfaces/review.interface";
import { Quote } from "lucide-react";
import StarRating from "../others/StarRating";

export default function ReviewCards({ review }: { review: Review }) {
  return (
    <div className="embla__slide min-w-0 pl-4 sm:pl-5 md:basis-1/2 lg:basis-1/3">
      <div
        className="
        group relative h-full flex flex-col gap-4
        bg-[rgba(15,23,42,0.75)] backdrop-blur-sm
        border border-[rgba(148,163,184,0.13)]
        rounded-2xl p-5 sm:p-6
        hover:border-sky-500/35 hover:-translate-y-1
        transition-all duration-300
      "
      >
        {/* Top gradient line */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quote icon */}
        <Quote
          size={28}
          className="text-sky-500/30 group-hover:text-sky-500/50 transition-colors duration-300 flex-shrink-0"
        />

        {/* Stars + date */}
        <div className="flex items-center justify-between">
          <StarRating rating={review.rating} />
          <span className="text-[11px] text-slate-500">{review.date}</span>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-semibold text-slate-100 leading-snug">
          {review.title}
        </h3>

        {/* Body */}
        <p className="text-[13px] text-slate-400 leading-relaxed flex-1">
          {review.review}
        </p>

        {/* Product tag */}
        <span className="self-start text-[11px] font-medium px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400">
          {review.product}
        </span>

        {/* Divider */}
        <div className="h-px bg-[rgba(148,163,184,0.1)]" />

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-sky-500/20 flex-shrink-0">
            <Image
              src={review?.avatar}
              alt={review?.name}
              fill
              className="object-cover"
              sizes="36px"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-[13px] font-semibold text-slate-200 truncate">
                {review.name}
              </p>
              {review.verified && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-400 flex-shrink-0">
                  ✓ VERIFIED
                </span>
              )}
            </div>
            <p className="text-[12px] text-slate-500 truncate">
              {review.handle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
