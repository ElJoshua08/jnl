"use server";

import { getInjection } from "@/core/di/container";

export async function getStoriesController() {
  const storiesRepository = getInjection("IStoriesRepository");

  return await storiesRepository.getStories();
}
