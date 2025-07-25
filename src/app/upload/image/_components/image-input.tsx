import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

export const ImageInput = ({
  onAdd,
}: {
  className?: string;
  onAdd: (files: File[]) => void;
}) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) {
      toast.error("No se encontraron archivos");
      return;
    }

    onAdd(files);
  }

  return (
    <div className="flex flex-col justify-start items-start gap-y-2">
      <div className="w-full min-h-56  rounded-lg  cursor-pointer group  relative overflow-hidden shadow-lg border-2 border-border/50 hover:border-border transition-all duration-300 hover:shadow-xl">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-20"
        />
        <div className="absolute flex flex-col items-center justify-center w-full h-full gap-y-8 top-0 left-0 z-0">
          <span className="rounded-full transition-all p-4 border-1 shadow-sm bg-muted group-hover:shadow-lg group-hover:shadow-pink-300 group-hover:scale-105 group-hover:border-pink-300 group-hover:bg-pink-300 group-hover:text-white">
            <PlusIcon className="size-14 stroke-[2.25px] p-1" />
          </span>

          <span className="text-muted-foreground text-sm text-center px-4">
            Haz click aquí o arrastra y suelta tus imágenes.
          </span>
        </div>
      </div>
    </div>
  );
};
