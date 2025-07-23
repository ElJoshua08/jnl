"use client";

import DatePicker from "@/app/upload/image/_components/date-picker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TagsInput } from "@/components/ui/tags-input";
import { Textarea } from "@/components/ui/textarea";
import {
  imageUploadInput,
  ImageUploadInput,
} from "@/interface-adapters/validation-schemas/image-upload.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const ImageForm = () => {
  const form = useForm<ImageUploadInput>({
    resolver: zodResolver(imageUploadInput),
  });

  return (
    <section className="flex w-full h-full flex-col gap-y-12  lg:max-w-1/2">
      <Form {...form}>
        <div className="space-y-12">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Nombre del dia (dia en la playita...)"
                  />
                </FormControl>
                <FormDescription />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="max-h-32"
                    placeholder="Descripción del dia, no hace falta que sea larga <3"
                  />
                </FormControl>
                <FormDescription />
              </FormItem>
            )}
          />

          <div className="flex items-start justify-start gap-x-12 w-full lg:flex-row flex-col gap-y-12">
            <FormField
              control={form.control}
              name="selected_date"
              render={({ field }) => (
                <FormItem className="w-full lg:w-1/2">
                  <FormLabel>Fecha de las fotos</FormLabel>
                  <FormControl>
                    <DatePicker />
                  </FormControl>
                  <FormDescription />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="selected_date"
              render={({ field }) => (
                <FormItem className="w-full lg:w-1/2">
                  <FormLabel>Añade tags (playa, ferias, cine...)</FormLabel>
                  <FormControl>
                    <TagsInput />
                  </FormControl>
                  <FormDescription />
                </FormItem>
              )}
            />
          </div>
        </div>
      </Form>
    </section>
  );
};
