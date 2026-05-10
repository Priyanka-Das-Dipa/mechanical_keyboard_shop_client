"use client";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ArrowButton } from "./slider/ArrowButton";
import { DotButton } from "./slider/DotButton";
import { carouselSlides } from "./slider/sliderData";
import Image from "next/image";

export default function Banner() {
  const autoplay = Autoplay({ delay: 5000, stopOnInteraction: false });

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Sync state with Embla
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  return (
    <div className="">
      {/* Embla root */}
      <div className="relative h-60 sm:h-80 md:h-117.5 lg:h-162.5 overflow-hidden shadow-2xl">
        {/* Prev arrow */}
        <ArrowButton
          onClick={scrollPrev}
          direction="prev"
          disabled={!canScrollPrev}
        />

        {/* Next arrow */}
        <ArrowButton
          onClick={scrollNext}
          direction="next"
          disabled={!canScrollNext}
        />

        {/* Dot navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-1.5 items-center">
          {carouselSlides.map((_, idx) => (
            <DotButton
              key={idx}
              selected={selectedIndex === idx}
              onClick={() => scrollTo(idx)}
            />
          ))}
        </div>

        {/* Embla viewport */}
        <div className="embla h-full" ref={emblaRef}>
          <div className="embla__container h-full">
            {carouselSlides.map((slide, idx) => (
              <div key={idx} className="embla__slide relative">
                {/* Background image */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Text content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                  <p className="text-xs sm:text-sm md:text-xl font-medium uppercase tracking-widest mb-2 opacity-80">
                    {slide.subtitle}
                  </p>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <button className=" px-5 py-2 md:px-8 md:py-3 text-sm md:text-base border-2 font-semibold border-white hover:bg-white hover:text-black rounded-full transition-colors duration-300">
                    Explore More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
