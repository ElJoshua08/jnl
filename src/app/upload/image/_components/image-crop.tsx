"use client";

import { getCroppedImg } from "@/app/upload/image/crop-image.util";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  RectangleHorizontalIcon,
  RectangleVerticalIcon,
  RotateCwIcon,
  SquareDashedIcon,
  XSquareIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import Cropper from "react-easy-crop";

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

export const ImageCrop = ({
  image,
  open,
  onOpenChange,
  onCrop,
}: {
  image: File;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCrop: (newImage: File) => void;
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

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState<AspectRatio>(1);

  const fileSizeMB = (image.size / 1024 / 1024).toFixed(2);

  async function handleConfirm() {
    if (!croppedAreaPixels) return;

    try {
      const croppedBlob = await getCroppedImg(src, croppedAreaPixels);
      const croppedFile = new File([croppedBlob], image.name, {
        type: "image/webp",
      });

      onCrop(croppedFile);
      onOpenChange(false);
    } catch (err) {
      console.error("Error al cortar la imagen:", err);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className=" w-full h-[90dvh] flex flex-col justify-between p-4 gap-4 !absolute">
        <DialogHeader>
          <DialogTitle className="text-base font-medium">
            {image.name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center  justify-between">
          <div className="flex items-center justify-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setRotation((prev) => (prev + 90) % 360)}
                >
                  <RotateCwIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Rotar 90°</TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center justify-center gap-2">
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
        </div>

        <div className="relative w-full flex-1 bg-muted rounded-md overflow-hidden">
          <Cropper
            image={src}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            zoomSpeed={0.2}
            minZoom={1}
            maxZoom={6}
            zoomWithScroll
            aspect={aspect}
            roundCropAreaPixels
            onCropChange={setCrop}
            onCropComplete={(_, croppedPixels) =>
              setCroppedAreaPixels(croppedPixels)
            }
            onZoomChange={setZoom}
            showGrid={true}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{fileSizeMB} MB</span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleConfirm}>Confirmar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
