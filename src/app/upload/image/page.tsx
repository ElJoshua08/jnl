"use client";

import { ImageDropOverlay } from "@/app/upload/image/_components/image-drop-overlay";
import { ImageForm } from "@/app/upload/image/_components/image-form";
import { ImageInput } from "@/app/upload/image/_components/image-input";
import ImagesTable from "@/app/upload/image/_components/images-table";
import { useState } from "react";

export default function UploadImagePage() {
  const [images, setImages] = useState<File[]>([]);

  function handleAddImages(droppedFiles: File[]) {
    setImages((prev) => [...prev, ...droppedFiles]);
  }

  function handleUpdateImages(file: File, newFile: File) {
    // Update base image
    const newImages = images
      .map((image) => {
        if (image.name === file.name) {
          return newFile;
        } else {
          return image;
        }
      })

    setImages(newImages);
  }

  function handleDeleteImages(file: File) {
    setImages((prev) => prev.filter((image) => image.name !== file.name));
  }

  return (
    <main className="flex w-full h-full items-start justify-start flex-col lg:flex-row gap-x-12 p-12 gap-y-12 lg:overflow-hidden">
      <ImageDropOverlay onAdd={handleAddImages} />

      {/* Left */}
      <section className="w-full h-full flex flex-col gap-y-12 lg:max-w-1/2 grow ">
        <ImageInput onAdd={handleAddImages} />

        <div className="overflow-auto grow min-h-0 shadow-lg  transition-all duration-300 hover:shadow-xl  rounded-xl">
          <ImagesTable
            onUpdate={handleUpdateImages}
            onDelete={handleDeleteImages}
            images={images}
          />
        </div>
      </section>

      {/* Right */}
      <section className="flex h-full w-full lg:w-1/2 flex-col items-start justify-start grow gap-y-12 pb-12 lg:pb-0">
        <ImageForm images={images} />
      </section>
    </main>
  );
}
