"use client";

import { getCroppedImg } from "@/app/upload/image/crop-image.util";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EditIcon,
  LanguagesIcon,
  LinkIcon,
  MoreVerticalIcon,
  RectangleHorizontalIcon,
  RectangleVerticalIcon,
  SquareDashedIcon,
  TrashIcon,
  XSquareIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import Cropper from "react-easy-crop";
import { useForm } from "react-hook-form";
import z from "zod";

type AspectRatio = number | undefined;

const aspectRatios: {
  label: string;
  icon: React.ReactNode;
  value: AspectRatio;
}[] = [
  { label: "1:1", icon: <SquareDashedIcon />, value: 1 },
  { label: "16:9", icon: <RectangleHorizontalIcon />, value: 16 / 9 },
  { label: "9:16", icon: <RectangleVerticalIcon />, value: 9 / 16 },
  { label: "Libre", icon: <XSquareIcon />, value: undefined },
];

const renameSchema = z.object({
  name: z.string().min(3, "Al menos 3 caracteres"),
});

type RenameForm = z.infer<typeof renameSchema>;

export const FileCard = ({
  image,
  onConfirm,
  onDelete,
}: {
  image: File;
  onConfirm: (newImage: File) => void;
  onDelete: () => void;
}) => {
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | {
    x: number;
    y: number;
    width: number;
    height: number;
  }>(null);

  const src = useMemo(() => {
    return URL.createObjectURL(image);
  }, [image]);

  const [open, setOpen] = useState(true);
  const [renameOpen, setRenameOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState<AspectRatio>(1);

  const fileSizeMB = (image.size / 1024 / 1024).toFixed(2);

  const renameForm = useForm<RenameForm>({
    resolver: zodResolver(renameSchema),
  });

  async function handleConfirm() {
    if (!croppedAreaPixels) return;

    try {
      const croppedBlob = await getCroppedImg(src, croppedAreaPixels);
      const croppedFile = new File([croppedBlob], image.name, {
        type: "image/webp",
      });

      onConfirm(croppedFile);
      setOpen(false);
    } catch (err) {
      console.error("Error al cortar la imagen:", err);
    }
  }

  async function handleRenameConfirm(data: RenameForm) {
    const newName = data.name;
    if (!newName) return;

    try {
      const newFile = new File([image], newName, {
        type: "image/webp",
      });

      onConfirm(newFile);
      setRenameOpen(false);
    } catch (err) {
      console.error("Error al renombrar la imagen:", err);
    }
  }

  return (
    <div className="flex items-center justify-between border rounded-md py-2 w-full pl-4 pr-2">
      <div className="inline-flex items-center gap-x-2">
        <LinkIcon className="size-4 text-muted-foreground" />
        <span className="text-lg">{image.name}</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="cursor-pointer">
            <MoreVerticalIcon className="size-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <EditIcon className="size-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setRenameOpen(true)}>
            <LanguagesIcon className="size-4" />
            Renombrar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDelete}
            variant="destructive"
          >
            <TrashIcon className="size-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent className="max-w-3xl w-full h-[90dvh] flex flex-col justify-between p-4 gap-4 !absolute">
          <DialogHeader>
            <DialogTitle className="text-base font-medium">
              {image.name}
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-2 justify-end">
            {aspectRatios.map(({ label, icon, value }) => (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant={aspect === value ? "default" : "outline"}
                    onClick={() => setAspect(value)}
                  >
                    {icon}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{label}</TooltipContent>
              </Tooltip>
            ))}
          </div>

          <div className="relative w-full flex-1 bg-muted rounded-md overflow-hidden">
            <Cropper
              image={src}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onCropComplete={(_, croppedPixels) =>
                setCroppedAreaPixels(croppedPixels)
              }
              onZoomChange={setZoom}
              showGrid={false}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {fileSizeMB} MB
            </span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleConfirm}>Confirmar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={renameOpen}
        onOpenChange={setRenameOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Renombrar imagen</DialogTitle>
          </DialogHeader>
          <Form {...renameForm}>
            <FormField
              control={renameForm.control}
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
          </Form>
          <DialogFooter>
            <Button onClick={() => setRenameOpen(false)}>Cancelar</Button>
            <Button onClick={renameForm.handleSubmit(handleRenameConfirm)}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
