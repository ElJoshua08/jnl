"use client";

import { insertImagesAction } from "@/app/upload/actions";
import { FilesGallery } from "@/app/upload/components/files-gallery";
import { FilesUpload } from "@/app/upload/components/files-upload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadSchema, uploadSchema } from "@/schemas/upload.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthUser } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";

export const UploadForm = ({ user }: { user?: AuthUser }) => {
  const form = useForm<UploadSchema>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      files: [],
      date: new Date(),
      title: "",
    },
  });

  async function handleSubmit(data: UploadSchema) {
    await insertImagesAction(data);
  }

  return (
    <div className="h-full w-full  flex p-12 pb-28 items-center justify-center">
      <Form {...form}>
        <div className="h-full flex flex-col lg:flex-row gap-12">
          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem className="h-full">
                <FilesUpload
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormItem>
            )}
          />
          <div className="flex gap-y-12 flex-col">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Añade un título descriptivo a tus archivos <3"
                      className="min-h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem className="h-full  flex-col hidden lg:!flex">
                  <FilesGallery
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={form.formState.isSubmitting}
              onClick={form.handleSubmit(handleSubmit)}
              size="lg"
            >
              Subir Archivos
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};
