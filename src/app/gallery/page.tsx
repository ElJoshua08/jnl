import { AppDock } from "@/components/shared/app-dock";

export default function GalleryPage() {
  return (
    <div className="flex items-center justify-center w-full h-dvh flex-col gap-y-6">
      <div className="min-w-md">
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-lg font-bold">Gallery</h2>
            <p className="text-sm text-muted-foreground">
              Manage your gallery and stories.
            </p>
          </div>
        </div>
      </div>

      <AppDock />
    </div>
  );
}
