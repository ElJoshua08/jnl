"use client";

import DomeGallery from "@/components/DomeGallery";
import { File } from "@/types/files";
import { Image } from "@/types/images";

export const Hero = ({
  images,
  files,
}: {
  images?: Image[];
  files?: File[];
}) => {
  if (!images || !files) return null;

  const domeImages = files.map((file) => file.publicUrl);

  console.log(domeImages);

  return images && files ? (
    <main className="w-full min-h-dvh">
      <DomeGallery />
    </main>
  ) : (
    <main className="flex flex-col items-center justify-center gap-4 text-center">
      <span>Aún no hay imagenes.</span>
    </main>
  );
};
