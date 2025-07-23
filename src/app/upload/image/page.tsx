"use client";

import { FileCard } from "@/app/upload/image/_components/file-card";
import { ImageForm } from "@/app/upload/image/_components/form";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import { toast } from "sonner";

export default function UploadImagePage() {
  const [isDraggingOverPage, setIsDraggingOverPage] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);

    const validImages = droppedFiles.filter((file) => {
      if (!file.type.startsWith("image")) {
        toast.error(`El archivo ${file.name} no es una imagen`);
        return false;
      }
      toast.info(`Añadiendo ${file.name}`);
      return true;
    });

    setImages((prev) => [...prev, ...validImages]);
    setIsDraggingOverPage(false);
  };

  return (
    <main
      className="flex w-full h-full items-start justify-start flex-row gap-y-6 py-12 px-12 flex-wrap"
      onDragOver={(e) => {
        e.preventDefault();
        if (e.dataTransfer.types.includes("Files")) setIsDraggingOverPage(true);
      }}
      onDragLeave={() => setIsDraggingOverPage(false)}
    >
      <DropOverlay
        open={isDraggingOverPage}
        onDrop={handleDrop}
      />

      {/* Left */}
      <section className="w-full h-fit lg:h-full flex flex-col gap-y-12  xl:pr-6 lg:max-w-1/2 grow ">
        <InputCard
          onAdd={handleFileInput}
          showLabel
        />

        {images && images.length > 0 && (
          <Gallery
            onUpdate={(index, file) =>
              setImages((prev) => [
                ...prev.slice(0, index),
                file,
                ...prev.slice(index + 1),
              ])
            }
            onDelete={(index) =>
              setImages((prev) => [
                ...prev.slice(0, index),
                ...prev.slice(index + 1),
              ])
            }
            images={images}
          />
        )}
      </section>

      {/* Right */}
      <ImageForm />
    </main>
  );
}

function DropOverlay({
  open,
  onDrop,
}: {
  open: boolean;
  onDrop: (e: React.DragEvent) => void;
}) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent
        className="border-pink-300 border-2 shadow-lg flex items-center justify-center flex-col"
        style={{
          minWidth: "calc(100dvw - 2rem)",
          height: "calc(100dvh - 2rem)",
        }}
        onDrop={onDrop}
      >
        <AlertDialogTitle />
        <AlertDialogDescription />
        <span className="rounded-full transition-all p-4 border-1 shadow-lg shadow-pink-300 border-pink-300 bg-pink-300 text-white">
          <PlusIcon className="size-26 stroke-[1.25px] p-2" />
        </span>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function InputCard({
  className,
  onAdd,
  showLabel = false,
}: {
  className?: string;
  onAdd: InputHTMLAttributes<HTMLInputElement>["onChange"];
  showLabel?: boolean;
}) {
  return (
    <div className="flex flex-col justify-start items-start gap-y-2">
      <span className="text-sm">Images</span>
      <div
        className={cn(
          "min-w-md  w-full min-h-56 border-1 rounded-lg shadow-sm cursor-pointer group transition-all hover:shadow-lg relative overflow-hidden",
          className
        )}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onAdd}
          className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-20"
        />
        <div className="absolute flex flex-col items-center justify-center w-full h-full gap-y-8 top-0 left-0 z-0">
          <span className="rounded-full transition-all p-4 border-1 shadow-sm bg-muted group-hover:shadow-lg group-hover:shadow-pink-300 group-hover:scale-105 group-hover:border-pink-300 group-hover:bg-pink-300 group-hover:text-white">
            <PlusIcon className="size-14 stroke-[2.25px] p-1" />
          </span>
          {showLabel && (
            <span className="text-muted-foreground text-sm text-center px-4">
              Haz click aquí o arrastra y suelta tus imágenes.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Gallery({
  images,
  onUpdate,
  onDelete,
}: {
  images: File[];
  onUpdate: (index: number, file: File) => void;
  onDelete: (index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-y-4 w-full min-w-md  h-full items-start justify-start ">
      {images.map((image, index) => {
        return (
          <FileCard
            key={image.name}
            image={image}
            onConfirm={() => onUpdate(index, image)}
            onDelete={() => onDelete(index)}
          />
        );
      })}
    </div>
  );
}
