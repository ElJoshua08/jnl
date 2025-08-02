"use client";

import { Story } from "@/entities/models/story.entity";
import { useEffect, useRef, useState } from "react";

export const Masonry = ({ stories }: { stories: Story[] }) => {
  const [visibleImages, setVisibleImages] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageId = entry.target.getAttribute("data-id") || "";
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

  const setImageRef = (element: HTMLDivElement | null, imageId: string) => {
    if (element && observerRef.current) {
      element.setAttribute("data-id", imageId);
      observerRef.current.observe(element);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max relative w-full max-w-400">
      <div className="absolute w-[250px] h-[250px] -top-6 -left-6 border-t border-l border-pink-800 dark:border-pink-300 z-10" />

      <div className="absolute w-[250px] h-[250px] -top-6 -right-6 border-t border-r border-pink-800 dark:border-pink-300" />

      {stories.map((story, index) => {
        const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${story.images_paths[0]}`;
        if (!imageUrl) return null;

        return (
          <div
            key={story.id}
            ref={(el) => setImageRef(el, story.id)}
            draggable={false}
            className={`
                group relative  rounded-sm  shadow-sm hover:shadow-xl
                transition-all duration-700 ease-out transform w-fit h-fit object-cover cursor-pointer overflow-hidden
                ${visibleImages.has(story.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
            style={{
              transitionDelay: `${(index % 6) * 100}ms`,
            }}
          >
            <div className="relative overflow-hidden">
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <img
                src={imageUrl}
                className="w-full h-full object-cover"
              />

              {/* Image info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </div>

            {/* Subtle border effect */}
            <div className="absolute inset-0  ring-1 ring-black/5 pointer-events-none" />
          </div>
        );
      })}
    </div>
  );
};
