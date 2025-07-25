import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const ImageDropOverlay = ({
  onAdd,
}: {
  onAdd: (files: File[]) => void;
}) => {
  const [open, setOpen] = useState(false);

  function handleDrop(e: React.DragEvent) {
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

    onAdd(validImages);
    setOpen(false);
  }

  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer?.types.includes("Files")) setOpen(true);
    };

    const handleDragLeave = () => {
      setOpen(false);
    };

    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("dragleave", handleDragLeave);

    return () => {
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("dragleave", handleDragLeave);
    };
  }, []);

  return (
    <>
      <AlertDialog open={open}>
        <AlertDialogContent
          className="border-pink-300 border-2 shadow-lg flex items-center justify-center flex-col !max-w-none"
          style={{
            width: "calc(100vw - 2rem)",
            height: "calc(100vh - 2rem)",
          }}
          onDrop={handleDrop}
        >
          <AlertDialogTitle />
          <AlertDialogDescription />
          <span className="rounded-full transition-all p-4 border-1 shadow-lg shadow-pink-300 border-pink-300 bg-pink-300 text-white">
            <PlusIcon className="size-26 stroke-[1.25px] p-2" />
          </span>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
