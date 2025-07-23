import { CtaNav } from "@/app/cta-nav";
import { getUserController } from "@/interface-adapters/controller/get-user.controller";

export default async function Home() {
  const user = await getUserController();

  return (
    <div>
      <CtaNav user={user} />
      JNL
    </div>
  );
}
