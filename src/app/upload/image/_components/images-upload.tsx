import { getImageSize } from "@/app/upload/image/utils";
import { Loading } from "@/components/shared/loading";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { OperationError } from "@/entities/errors/common.error";
import { StoryInsert } from "@/entities/models/story.entity";
import { createImageController } from "@/interface-adapters/controller/create-image.controller";
import { createStoryController } from "@/interface-adapters/controller/create-story.controller";
import { uploadImage } from "@/interface-adapters/controller/upload-images.controller";
import imageCompression from "browser-image-compression";
import { ArrowRightIcon, CheckIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export const ImagesUpload = ({
  images,
  formInput,
}: {
  images: File[];
  formInput: () => Promise<Omit<StoryInsert, "images_paths"> | undefined>;
}) => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const handleSubmit = async () => {
    if (images.length === 0) {
      toast.error("No hay imágenes para subir");
      return;
    }

    const input = await formInput();
    if (!input) return;

    setOpen(true);
    setUploading(true);

    // Compress images before uploading
    const compressedImages = await Promise.all(
      images.map((image) =>
        imageCompression(image, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: "image/webp",
          initialQuality: 0.95,
        })
      )
    );

    // Upload images and create records in the DB
    const imagePaths = (
      await Promise.all(
        compressedImages.map(async (image) => {
          try {
            const imagePath = await uploadImage(image);
            if (!imagePath) {
              toast.error("Error al subir la imagen");
              return null;
            }

            // Get width and height of the image
            const { width, height } = await getImageSize(image);

            // Save image info to the DB
            await createImageController({
              image_path: imagePath,
              width,
              height,
            });

            return imagePath;
          } catch (e) {
            if (e instanceof OperationError) {
              toast.error("Error al subir la imagen");
            } else {
              console.error("Error inesperado:", e);
            }
            return null;
          }
        })
      )
    ).filter((image) => image !== null); // Remove null entries

    // Create the story record
    await createStoryController({
      title: input.title,
      description: input.description,
      selected_date: input.selected_date,
      images_paths: imagePaths,
      tags: input.tags,
    });

    setUploading(false);
    setUploaded(true);
  };

  return (
    <>
      <Button
        className="w-full font-bold text-lg h-auto py-3 inline-flex items-center gap-6"
        size="lg"
        onClick={handleSubmit}
      >
        Subir fotos <PlusIcon className="size-6 stroke-3" />
      </Button>
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
      >
        <AlertDialogOverlay className="backdrop-blur-sm bg-black/75" />
        <AlertDialogContent
          data-uploaded={uploaded}
          className="flex flex-col transition-all duration-150"
        >
          {uploading && <UploadingImages />}
          {uploaded && <UploadedImages />}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

const UploadingImages = () => {
  return (
    <>
      <div className="flex items-center justify-center flex-col h-full">
        <Loading />
      </div>
      <AlertDialogHeader className="text-center w-full flex items-center justify-center">
        <AlertDialogTitle className="text-xl">Subiendo fotos</AlertDialogTitle>
        <AlertDialogDescription>
          Esto puede tardar un rato, espera un momento.
        </AlertDialogDescription>
      </AlertDialogHeader>
    </>
  );
};

const UploadedImages = ({}) => {
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Las imagenes han sido subidas correctamente
        </AlertDialogTitle>
        <AlertDialogDescription>
          Haz click en el botón de abajo para verlas
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div className="py-12 flex items-center justify-center w-full">
        <div className="flex items-center justify-center size-32 p-6 shadow-pink-600/65 shadow-xl rounded-full bg-pink-400">
          <CheckIcon className="size-28 text-white drop-shadow-lg drop-shadow-black/50 stroke-3" />
        </div>
      </div>
      <AlertDialogFooter>
        <Link
          href="/gallery/stories/image-id"
          className={buttonVariants({
            className: "w-full",
          })}
        >
          Ver mis fotos <ArrowRightIcon className="size-4 stroke-3" />
        </Link>
      </AlertDialogFooter>
    </>
  );
};
