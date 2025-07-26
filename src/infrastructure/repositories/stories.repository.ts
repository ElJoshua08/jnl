import { IStoriesRepository } from "@/application/repositories/stories-repository.interface";
import { Story } from "@/entities/models/story.entity";

export class StoriesRepository implements IStoriesRepository {
  async getStories(): Promise<Story[]> {
    return [];
  }

  async getStory(id: string): Promise<Story> {
    return {
      id: "1",
      title: "Story 1",
      description: "Description 1",
      selected_date: new Date(),
      images_urls: ["https://picsum.photos/id/1/200/300"],
      tags: ["tag1", "tag2"],
    };
  }

  async createStory(story: Story): Promise<void> {
    // Aquí podrías hacer una llamada a una base de datos
  }
}
