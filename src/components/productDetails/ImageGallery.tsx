"use client";
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface Props {
  images: string[];
}

export default function ImageGallery({ images }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  return (
    <div>
      <div className="space-y-4">
        {/* Main Image */}
        <div className=" relative aspect-square bg-zinc-900 rounded-3xl overflow-hidden border border-[var(--border-color)]">
          <Swiper
            spaceBetween={10}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="h-full w-full"
          >
            {images.map((img, index) => {
              const imageUrl = `http://localhost:5000${img}`;

              return (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full">
                    <Image
                      src={imageUrl}
                      alt={`Product view ${index + 1}`}
                      fill
                      className="object-cover "
                      priority={index === 0}
                      unoptimized
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Thumbnails */}
        <div className="px-4">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={12}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
            className="thumbs-swiper"
          >
            {images.map((img, index) => {
              const imageUrl = `http://localhost:5000${img}`;

              return (
                <SwiperSlide key={index}>
                  <div className="relative aspect-square rounded-2xl overflow-hidden border border-[var(--border-color)] cursor-pointer hover:border-primary transition">
                    <Image
                      src={imageUrl}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
