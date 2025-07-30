"use client"

import { GalleryImage } from "@/app/gallery/page";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const Masonry = ({ images }: { images: GalleryImage[] }) => {
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageId = Number.parseInt(
              entry.target.getAttribute("data-id") || "0"
            );
            setVisibleImages((prev) => new Set([...prev, imageId]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const setImageRef = (element: HTMLDivElement | null, imageId: number) => {
    if (element && observerRef.current) {
      element.setAttribute("data-id", imageId.toString());
      observerRef.current.observe(element);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max h-full relative overflow-y-auto overflow-x-hidden">
      <div className="absolute w-[250px] h-[250px] -top-6 -left-6 border-t border-l border-pink-200 dark:border-pink-800 z-10" />

      <div className="absolute w-[250px] h-[250px] -top-6 -right-6 border-t border-r border-pink-200 dark:border-pink-800" />

      {images.map((image) => (
        <div
          key={image.id}
          ref={(el) => setImageRef(el, image.id)}
          className={`
                group relative overflow-hidden rounded-sm  shadow-sm hover:shadow-xl
                transition-all duration-700 ease-out transform w-full h-full object-cover
                ${visibleImages.has(image.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                ${image.wide ? "md:col-span-2" : ""}
                ${image.tall ? "md:row-span-2" : ""}
              `}
          style={{
            transitionDelay: `${(image.id % 6) * 100}ms`,
          }}
        >
          <div className="relative overflow-hidden">
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              width={image.wide ? 600 : 300}
              height={image.tall ? 500 : image.wide ? 250 : 400}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 !rounded-none"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Image info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-medium text-sm">{image.alt}</h3>
            </div>
          </div>

          {/* Subtle border effect */}
          <div className="absolute inset-0  ring-1 ring-black/5 pointer-events-none" />
        </div>
      ))}
    </div>
  );
};
