import { FlowerIcon } from "@/components/icons/flower";
import { Loading } from "@/components/shared/loading";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogOverlay, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LoaderCircle, PlusIcon } from "lucide-react";
import { useState } from "react";

export const ImagesUpload = ({
  form,
  images,
}: {
  form: any;
  images: File[];
}) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setOpen(true);
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
        <AlertDialogContent className="flex flex-col">
          <div className="flex items-center justify-center flex-col h-full">
          <Loading />
          </div>
        <AlertDialogHeader className="text-center w-full flex items-center justify-center">
          <AlertDialogTitle className="text-xl">Subiendo fotos</AlertDialogTitle>
            <AlertDialogDescription>
              Esto puede tardar un rato, espera un momento.
          </AlertDialogDescription>
        </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
