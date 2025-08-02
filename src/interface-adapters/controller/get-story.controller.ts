"use server";

import { getInjection } from "@/core/di/container";
import { InputParseError } from "@/entities/errors/common.error";
import { Story } from "@/entities/models/story.entity";

export const getStoryController = async (id: string): Promise<Story | null> => {
  if (!id) {
    throw new InputParseError("Invalid story ID");
  }

  try {
    const storiesRepository = getInjection("IStoriesRepository");
    const story = await storiesRepository.getStory(id);

    return story;
  } catch (e) {
    console.error("Error al obtener la historia:", e);
    return null;
  }
};
