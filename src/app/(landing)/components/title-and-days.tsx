import { START_DATE } from "@/constants/global";
import { differenceInDays } from "date-fns";

export const TitleAndDays = () => {
  return (
    <main className="flex flex-col items-center justify-center h-full w-full gap-y-12 relative px-6 -mt-16 -z-10">
      <div className="absolute lg:block hidden w-[600px] h-[250px] bottom-24 right-24 border-pink-800 dark:border-pink-300 border-b border-r" />

      <div className="absolute lg:block hidden w-[600px] h-[250px] bottom-24 left-24 border-pink-800 dark:border-pink-300 border-b border-l" />

      <span className="text-7xl md:text-9xl font-bold font-header tracking-tight animate-in slide-in-from-bottom-100 fade-in-0 duration-[2500ms] ease-in-out text-center text-balance">
        Josué and Leire
      </span>

      <span className="text-gray-500 dark:text-gray-300 text-3xl lg:text-5xl font-bold font-header tracking-tight animate-in slide-in-from-bottom-[125px] fade-in-0 duration-[2850ms] ease-in-out">
        {differenceInDays(new Date(), START_DATE)} days together
      </span>
    </main>
  );
};
