"use server";

import { getInjection } from "@/core/di/container";
import { InputParseError } from "@/entities/errors/common.error";
import { StoryInsert, storyInsert } from "@/entities/models/story.entity";

export async function createStoryController(story: StoryInsert) {
  const { error: inputParseError } = storyInsert.safeParse(story);

  if (inputParseError) {
    throw new InputParseError("Algunos datos son incorrectos", {
      cause: inputParseError.cause,
    });
  }

  const storageRepository = getInjection("IStoriesRepository");
  const resultStory = await storageRepository.createStory(story);

  return resultStory;
}
