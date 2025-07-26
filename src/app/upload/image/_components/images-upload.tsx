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
import { ImageUploadInput } from "@/interface-adapters/validation-schemas/image-upload.schema";
import { ArrowRightIcon, CheckIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export const ImagesUpload = ({
  images,
  formInput,
}: {
  images: File[];
  formInput: () => Promise<ImageUploadInput | undefined>;
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
    if (!input) {
      return;
    }

    setOpen(true);
    setUploading(true);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    setUploading(false);
    setUploaded(true);
  };

  return (
    <>
      <Button
        className="w-full font-semibold"
        size="lg"
        onClick={handleSubmit}
      >
        Subir fotos <PlusIcon className="size-4 stroke-3" />
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
        <Link href="/gallery/stories/image-id" className={
          buttonVariants({
            className: "w-full"
          })
        }>
          Ver mis fotos <ArrowRightIcon className="size-4 stroke-3" />
        </Link>
      </AlertDialogFooter>
    </>
  );
};
