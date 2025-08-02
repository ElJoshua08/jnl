import { CtaNav } from "@/app/cta-nav";
import { Masonry } from "@/app/gallery/_components/masonry";
import { Footer } from "@/components/shared/footer";
import { getStoriesController } from "@/interface-adapters/controller/get-stories.controller";
import { getUserController } from "@/interface-adapters/controller/get-user.controller";

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  wide?: boolean;
  tall?: boolean;
}

export default async function GalleryPage() {
  const user = await getUserController();
  const stories = await getStoriesController();

  return (
    <div className="h-dvh w-full overflow-y-auto">
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

      <main className="flex flex-col items-start justify-center
      w-full py-20 px-24 gap-y-24">
        <div className="w-full flex items-center justify-center">
          <span className="font-header text-5xl text-center text-balance font-bold tracking-tight">
            Una coleccion de nuestros mejores momentos juntos
          </span>
        </div>

        <Masonry stories={stories} />
      </main>
      <Footer />
    </div>
  );
}
