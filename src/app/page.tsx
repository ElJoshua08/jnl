import { CtaNav } from "@/app/cta-nav";
import { Footer } from "@/components/shared/footer";
import { getUserController } from "@/interface-adapters/controller/get-user.controller";
import { differenceInDays } from "date-fns";

export default async function Home() {
  const user = await getUserController();
  const startDate = new Date("2024-02-14");

  return (
    <div className="h-dvh w-full">
      {/* Pink Glow Background */}
      <div
        className="absolute inset-0 block dark:hidden -z-10"
        style={{
          backgroundImage: `
        radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #ec4899 100%)
      `,
          backgroundSize: "100% 100%",
        }}
      />
      <div
        className="absolute inset-0 -z-10 dark:block hidden"
        style={{
          background: `
          radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
          radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
          radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
          radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
          #000000
        `,
        }}
      />
      <CtaNav user={user} />

      <main className="flex flex-col items-center justify-center h-full w-full gap-y-12 relative">
        <div className="absolute w-[600px] h-[250px] bottom-24 right-24 border-pink-200 dark:border-pink-800 border-b border-r" />

        <div className="absolute w-[600px] h-[250px] bottom-24 left-24 border-pink-200 dark:border-pink-800 border-b border-l" />

        <span className="text-9xl font-bold font-header tracking-tight animate-in slide-in-from-bottom-100 fade-in-0 duration-[2500ms] ease-in-out">
          Josué and Leire
        </span>

        <span className="text-5xl font-bold font-header tracking-tight animate-in slide-in-from-bottom-[125px] fade-in-0 duration-[2850ms] ease-in-out">
          {differenceInDays(new Date(), startDate)} days together
        </span>
      </main>

      <Footer />
    </div>
  );
}
