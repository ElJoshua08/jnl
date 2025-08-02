"use client";

import { StoryView } from "@/app/gallery/_components/story-view";
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

      {stories.map((story, index) => (
        <StoryView
          story={story}
          index={index}
          isVisible={visibleImages.has(story.id)}
          setImageRef={setImageRef}
        />
      ))}
    </div>
  );
};
