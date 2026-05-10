"use client";

import ReviewCards from "@/src/utilities/cards/ReviewCards";
import { REVIEWS, STATS } from "@/src/utilities/fakeData/Review";
import { DotButton } from "@/src/utilities/others/StarRating";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

export default function CustomerReviews() {
  const autoplay = Autoplay({ delay: 4000, stopOnInteraction: true });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", slidesToScroll: 1, containScroll: false },
    [autoplay],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("reInit", onInit);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );
  return (
    <>
      <section className="relative py-20 overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-125 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.07)_0%,transparent_70%)]" />

        <div className="container mx-auto px-4 sm:px-6">
          {/* ── Header ── */}
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-sky-500 mb-3">
              What our customers say
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 bg-linear-to-br from-slate-50 via-slate-100 to-sky-400 bg-clip-text text-transparent">
              Loved by Keyboard Enthusiasts
            </h2>
            <p className="text-slate-400 text-[15px] max-w-md mx-auto leading-relaxed">
              Don&apos;t take our word for it — here&apos;s what the community
              thinks about our boards, keycaps, and service.
            </p>
          </div>

          {/* ── Stats ── */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mb-14">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold bg-linear-to-br from-sky-300 to-sky-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-[12px] text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* ── Embla Carousel ── */}
          <div className="overflow-hidden">
            <div ref={emblaRef} className="overflow-visible">
              <div className="flex gap-4 sm:gap-6">
                {REVIEWS.map((review, idx) => {
                  const isActive = idx === selectedIndex;
                  return (
                    <div
                      key={review.id}
                      className={`
              flex-shrink-0 transition-all duration-500
              w-[82%] sm:w-[62%] md:w-[48%] lg:w-[40%]
              ${isActive ? "opacity-100 scale-100" : "opacity-35 scale-[0.96]"}
            `}
                    >
                      <ReviewCards review={review} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Controls ── */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Prev */}
            <button
              onClick={scrollPrev}
              aria-label="Previous review"
              className="
              w-9 h-9 rounded-full flex items-center justify-center
              bg-[rgba(15,23,42,0.8)] border border-[rgba(148,163,184,0.15)]
              text-slate-400 hover:text-sky-400 hover:border-sky-500/40
              transition-all duration-200
            "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  d="M15 18l-6-6 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {scrollSnaps.map((_, idx) => (
                <DotButton
                  key={idx}
                  selected={selectedIndex === idx}
                  onClick={() => scrollTo(idx)}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={scrollNext}
              aria-label="Next review"
              className="
              w-9 h-9 rounded-full flex items-center justify-center
              bg-[rgba(15,23,42,0.8)] border border-[rgba(148,163,184,0.15)]
              text-slate-400 hover:text-sky-400 hover:border-sky-500/40
              transition-all duration-200
            "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  d="M9 18l6-6-6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
