import { Decoration } from "@/app/(landing)/components/decoration";
import { Header } from "@/app/(landing)/components/header";
import { Hero } from "@/app/(landing)/components/hero";
import { AppDock } from "@/components/shared/app-dock";
import { Dock } from "@/components/ui/dock";
import { getUser } from "@/services/supabase/get-user.service";
import { getImages } from "@/services/supabase/images/get.service";
import { getFiles } from "@/services/supabase/storage/get.service";

export default async function Home() {
  const { data: user } = await getUser();
  const { data: images } = await getImages({
    limit: 40,
  });
  const { data: files } = await getFiles("images");

  return (
    <div className="h-dvh w-full">
      <Decoration />

      <Header user={user} />

      <Hero images={images} files={files} />

      <AppDock />

      {/* <Footer /> */}
    </div>
  );
}
