import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const FilesGallery = ({
  value,
  onChange,
}: {
  value: File[];
  onChange: (value: File[]) => void;
}) => {
  function handleEdit(file: File, newFile: File) {
    console.log("We are editing", newFile);

    const newValue = value.map((f) => (f.name === file.name ? newFile : f));

    onChange(newValue);
  }

  function handleRemove(file: File) {
    const newValue = value.filter((f) => f.name !== file.name);

    onChange(newValue);
  }

  return (
    <Card className="min-w-md min-h-72 h-full !p-0">
      {value.length > 0 ? (
        <div className="flex items-start justify-start w-full h-full flex-col !p-0 overflow-hidden">
          {value.map((file) => (
            <FileItem
              key={file.name}
              onEdit={(newFile) => handleEdit(file, newFile)}
              onRemove={() => handleRemove(file)}
              file={file}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <span className="inline-block rotate-12 text-2xl">
            Aún no has subido ningun archivo :(
          </span>
        </div>
      )}
    </Card>
  );
};

const FileItem = ({
  file,
  onRemove,
  onEdit,
}: {
  file: File;
  onRemove: () => void;
  onEdit: (newFile: File) => void;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(file.name);

  useEffect(() => {
    if (editingName && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingName]);

  function handleNameChange() {
    const newFile = new File([file], newName);

    onEdit(newFile);
    setEditingName(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full min-h-12 hover:bg-muted/50 border-y-1 border-transparent hover:border-muted transition-all duration-100 ease-out px-4 py-2 cursor-pointer flex items-center justify-start gap-x-4">
          <div className="size-8">
            <img
              src={URL.createObjectURL(file)}
              className="w-full h-full object-cover  rounded-md"
            />
          </div>

          {editingName ? (
            <input
              ref={inputRef}
              value={newName}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onChange={(e) => {
                setNewName(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (newName.length === 0) {
                    toast.error("El nombre no puede estar vacío >:(");
                    return;
                  }

                  handleNameChange();
                }
              }}
              className="text-foreground/80 max-w-[50ch] truncate"
            />
          ) : (
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDoubleClick={() => {
                setEditingName(true);
              }}
              className="text-foreground/80 max-w-[50ch] truncate"
            >
              {file.name}
            </span>
          )}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{file.name}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <img
          src={URL.createObjectURL(file)}
          className="w-full h-full max-h-[80vh] object-cover p-3"
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={onRemove}
            >
              Eliminar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
