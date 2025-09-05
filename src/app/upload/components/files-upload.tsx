import { Card, CardContent } from "@/components/ui/card";
import { UploadCloudIcon } from "lucide-react";
import { useState } from "react";

export const FilesUpload = ({
  value,
  onChange,
}: {
  value: File[];
  onChange: (value: File[]) => void;
}) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (files) {
      onChange(Array.from(files));
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;

    if (files) {
      onChange(Array.from(files));
    }

    setIsDraggingOver(false);
  }

  return (
    <Card
      data-dragging-over={isDraggingOver}
      onDragEnter={() => setIsDraggingOver(true)}
      onDropCapture={handleDrop}
      onDragExit={() => setIsDraggingOver(false)}
      className="h-full min-w-md relative shadow-xl data-[dragging-over=true]:bg-muted  data-[dragging-over=true]:shadow-violet-500 transition-all duration-100 ease-out"
    >
      <input
        onChange={handleChange}
        type="file"
        multiple
        accept="image/*,video/*"
        className="w-full h-full opacity-0 absolute z-20 cursor-pointer"
      />
      <CardContent className="flex items-center justify-center w-full h-full flex-col gap-y-6">
        <UploadCloudIcon className="size-28" />
        <span className="text-3xl">Sube tus imagenes</span>
      </CardContent>
    </Card>
  );
};
