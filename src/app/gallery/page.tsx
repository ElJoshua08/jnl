import { CtaNav } from "@/app/cta-nav";
import { Masonry } from "@/app/gallery/_components/masonry";
import { Footer } from "@/components/shared/footer";
import { getUserController } from "@/interface-adapters/controller/get-user.controller";

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  wide?: boolean;
  tall?: boolean;
}

const images: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=400&fit=crop",
    alt: "Modern Architecture",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop",
    alt: "Mountain Landscape",
    wide: true,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=500&fit=crop",
    alt: "Abstract Art",
    tall: true,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=300&h=300&fit=crop",
    alt: "Minimalist Design",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=400&fit=crop",
    alt: "Urban Photography",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=250&fit=crop",
    alt: "Forest Scene",
    wide: true,
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=350&fit=crop",
    alt: "Portrait",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    alt: "Geometric Patterns",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=450&fit=crop",
    alt: "Street Art",
    tall: true,
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
    alt: "Interior Design",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=280&fit=crop",
    alt: "Ocean Sunset",
    wide: true,
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=380&fit=crop",
    alt: "Fashion",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=320&fit=crop",
    alt: "Food Photography",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop",
    alt: "Technology",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=400&fit=crop",
    alt: "Nature Macro",
  },
];

export default async function GalleryPage() {
  const user = await getUserController();

  return (
    <div className="h-dvh w-full">
      <div
        className="fixed inset-0 -z-10 dark:hidden"
        style={{
          background:
            "linear-gradient(120deg, #ffb3ba 0%, #f1f1f1 50%, #bae1ff 100%)",
        }}
      />

      <div
        className="fixed inset-0 -z-10 hidden dark:block"
        style={{
          background:
            "linear-gradient(120deg, #7e073b 0%, #030017 50%, #11035d 100%)",
        }}
      />
      <CtaNav user={user} />

      <main className="flex flex-col items-center justify-center h-fit w-full relative mt-37 overflow-y-auto-scroll pb-20">
        <div className="w-full px-32 flex items-center justify-center pb-28">
          <span className="text-5xl text-balance text-center font-header font-bold tracking-tight">
            Una colección de nuestros mejores momenotos juntos
          </span>
        </div>

        <section className="w-full px-32 mx-auto h-full">
          <Masonry images={images} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
