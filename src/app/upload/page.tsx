"use server";

import { UploadItemsCards } from "@/app/upload/items-cards";
import { UploadItemCard } from "@/core/types/upload-item-card";

import { AudioLinesIcon, ImageIcon, VideoIcon } from "lucide-react";

const FILE_UPLOAD_TYPES = [
  {
    id: "image",
    name: "Imagen",
    description: "Sube una o varias imagenes a la galeria",
    icon: ImageIcon,
    href: "/upload/image",
  },
  {
    id: "audio",
    name: "Audio",
    description: "Sube uno o varios audios a la galeria",
    icon: AudioLinesIcon,
    href: "/upload/audio",
  },
  {
    id: "video",
    name: "Video",
    description: "Sube uno o varios videos a la galeria",
    icon: VideoIcon,
    href: "/upload/video",
  },
] as UploadItemCard[];

export default async function UploadPage() {
  return (
    <main className="flex w-full h-full items-center justify-center flex-col gap-y-12">
      <UploadItemsCards items={FILE_UPLOAD_TYPES} />
    </main>
  );
}
