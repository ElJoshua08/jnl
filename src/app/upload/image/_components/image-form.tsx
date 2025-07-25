"use client";

import ImageDatePicker from "@/app/upload/image/_components/image-date-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { FileTextIcon } from "lucide-react";
import { useForm } from "react-hook-form";

export const ImageForm = () => {
  const form = useForm<ImageUploadInput>({
    resolver: zodResolver(imageUploadInput),
  });

  return (
    <Card className="flex grow w-full h-full max-w-full flex-col gap-y-12 items-start justify-start shadow-lg border-2 border-border/50 hover:border-border transition-all duration-300 hover:shadow-xl">
      <CardHeader className="flex items-center gap-2 text-xl w-full">
        <FileTextIcon className="size-5 text-primary" />
        <CardTitle>Cuentame sobre tu story</CardTitle>
      </CardHeader>
      <CardContent className="w-full h-full">
        <Form {...form}>
          <div className="space-y-12 w-full">
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

            <div className="flex items-start justify-start gap-x-12 w-full lg:flex-row flex-col gap-y-12 flex-wrap container">
              <FormField
                control={form.control}
                name="selected_date"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Fecha de las fotos</FormLabel>
                    <FormControl>
                      <ImageDatePicker />
                    </FormControl>
                    <FormDescription />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="selected_date"
                render={({ field }) => (
                  <FormItem className="w-full">
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
      </CardContent>
    </Card>
  );
};
