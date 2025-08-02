import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Story } from "@/entities/models/story.entity";
import { DialogDescription } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import Link from "next/link";

export const StoryView = ({
  story,
  index,
  isVisible,
  setImageRef,
}: {
  story: Story;
  index: number;
  isVisible: boolean;
  setImageRef: (element: HTMLDivElement | null, imageId: string) => void;
}) => {
  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${story.images_paths[0]}`;
  if (!imageUrl) return null;

  return (
    <Dialog>
      <DialogTrigger
        asChild
        role="button"
      >
        <div
          key={story.id}
          ref={(el) => setImageRef(el, story.id)}
          draggable={false}
          className={`
                group relative  rounded-sm  shadow-sm hover:shadow-xl
                transition-all duration-700 ease-out transform w-fit h-fit object-cover cursor-pointer overflow-hidden
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
          style={{
            transitionDelay: `${(index % 6) * 100}ms`,
          }}
        >
          <div className="relative overflow-hidden">
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <img
              src={imageUrl}
              className="w-full h-full object-cover"
            />

            {/* Image info overlay */}
            <div className="absolute bottom-0 left-0 right-0 px-4 py-2 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-between items-center">
              {story.title && (
                <h3 className="text-lg font-semibold">{story.title}</h3>
              )}

              {story.selected_date && (
                <p className="text-xs text-muted/75 font-semibold">{format(story.selected_date, "dd/MM/yyyy")}</p>
              )}
            </div>
          </div>

          {/* Subtle border effect */}
          <div className="absolute inset-0  ring-1 ring-black/5 pointer-events-none" />
        </div>
      </DialogTrigger>
      <DialogContent
        className="!max-w-none overflow-scroll"
        style={{
          width: "calc(100vw - 2rem)",
          height: "calc(100vh - 2rem)",
        }}
      >
        <DialogHeader>
          <DialogTitle>{story.title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground -mt-2">
            {story.description || "No description available."}
          </DialogDescription>
          <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max relative w-full overflow-scroll mt-10">
            {story.images_paths.map((imagePath, imgIndex) => {
              const imageSrc = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${imagePath}`;
              return (
                <img
                  key={imgIndex}
                  src={imageSrc}
                  className="w-full h-full object-cover rounded-md"
                  alt={`Story image ${imgIndex + 1}`}
                />
              );
            })}
          </div>
          <DialogFooter>
            <Link
              href={`/gallery/stories/${story.id}`}
              className={buttonVariants({
                variant: "default",
              })}
            >
              Ver historia completa
            </Link>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
