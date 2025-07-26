"use server";

import { UploadLinkCard } from "@/app/upload/upload-link";
import { UploadLink } from "@/core/types/upload-link";
import { AudioLinesIcon, ImageIcon, VideoIcon } from "lucide-react";

const UPLOAD_LINKS = [
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
] as UploadLink[];

export default async function UploadPage() {
  return (
    <main className="flex w-full h-full items-center justify-center flex-row gap-12 flex-wrap p-12 overflow-y-auto ">
      {UPLOAD_LINKS.map((uploadLink) => (
        <UploadLinkCard key={uploadLink.id} link={uploadLink} />
      ))}
    </main>
  );
}
