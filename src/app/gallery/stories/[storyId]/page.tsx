"use client";

import { Story } from "@/entities/models/story.entity";
import { getStoryController } from "@/interface-adapters/controller/get-story.controller";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ViewStoryPage() {
  const { storyId } = useParams();
  const [story, setStory] = useState<Story | null>(null);

  useEffect(() => {
    let _ignore = false;

    async function fetchStory() {
      if (_ignore || !storyId || typeof storyId !== "string") return;
      const story = await getStoryController(storyId);
      if (story) {
        setStory(story);
      }
    }
    fetchStory();

    return () => {
      _ignore = true;
    };
  }, [storyId]);

  return (
    <div>
      {story && (
        <div>
          <h1>{story.title}</h1>
          <p>{story.description}</p>
        </div>
      )}
    </div>
  );
}
