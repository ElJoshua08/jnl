import { IStoriesRepository } from "@/application/repositories/stories-repository.interface";
import { NotFoundError, OperationError } from "@/entities/errors/common.error";
import { Story, StoryInsert } from "@/entities/models/story.entity";
import { createAdminClient } from "@/infrastructure/utils/supabase/server";

export class StoriesRepository implements IStoriesRepository {
  async getStories(): Promise<Story[]> {
    const supabase = await createAdminClient();

    const { data, error } = await supabase.from("stories").select("*");

    if (error) {
      throw new OperationError(error.message, {
        cause: error.cause,
      });
    }

    if (!data) {
      throw new NotFoundError("Story not found");
    }

    return data as Story[];
  }

  async getStory(id: string): Promise<Story> {
    const supabase = await createAdminClient();

    const { data, error } = await supabase
      .from("stories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new OperationError(error.message, {
        cause: error.cause,
      });
    }

    if (!data) {
      throw new NotFoundError("Story not found");
    }

    return data as Story;
  }

  async createStory(story: StoryInsert): Promise<Story> {
    const supabase = await createAdminClient();

    const { data, error } = await supabase
      .from("stories")
      .insert(story)
      .select("*")
      .single();

    if (error) {
      throw new OperationError(error.message, {
        cause: error.cause,
      });
    }

    if (!data) {
      throw new OperationError("Error creating story");
    }

    return data as Story;
  }
}
