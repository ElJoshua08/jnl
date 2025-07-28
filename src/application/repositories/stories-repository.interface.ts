import { Story, StoryInsert } from "@/entities/models/story.entity";

export interface IStoriesRepository {
  getStories(): Promise<Story[]>;
  getStory(id: string): Promise<Story>;
  createStory(story: StoryInsert): Promise<Story>;
}
