"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  wide?: boolean;
  tall?: boolean;
}

const images: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=400&fit=crop",
    alt: "Modern Architecture",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop",
    alt: "Mountain Landscape",
    wide: true,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=500&fit=crop",
    alt: "Abstract Art",
    tall: true,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=300&h=300&fit=crop",
    alt: "Minimalist Design",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=400&fit=crop",
    alt: "Urban Photography",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=250&fit=crop",
    alt: "Forest Scene",
    wide: true,
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=350&fit=crop",
    alt: "Portrait",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    alt: "Geometric Patterns",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=450&fit=crop",
    alt: "Street Art",
    tall: true,
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
    alt: "Interior Design",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=280&fit=crop",
    alt: "Ocean Sunset",
    wide: true,
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=380&fit=crop",
    alt: "Fashion",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=320&fit=crop",
    alt: "Food Photography",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop",
    alt: "Technology",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=400&fit=crop",
    alt: "Nature Macro",
  },
];

export default function GalleryPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-4">Gallery</h1>
          <p className="text-gray-600 text-lg">
            A curated collection of visual stories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
          {images.map((image) => (
            <div
              key={image.id}
              ref={(el) => setImageRef(el, image.id)}
              className={`
                group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl
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
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Image info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-medium text-sm">{image.alt}</h3>
                </div>
              </div>

              {/* Subtle border effect */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Load more section */}
        <div className="text-center mt-16">
          <button className="px-8 py-3 bg-white text-gray-700 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:bg-gray-50 font-medium">
            Load More Images
          </button>
        </div>
      </div>
    </div>
  );
}
