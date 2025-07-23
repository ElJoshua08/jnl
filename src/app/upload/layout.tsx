import { AccountDropdown } from "@/components/shared/account";
import { getUserController } from "@/interface-adapters/controller/get-user.controller";
import { redirect } from "next/navigation";

export default async function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserController();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex items-start justify-start w-full h-dvh flex-col">
      <header className="flex items-center justify-between px-6 w-full py-4 border-b shadow-sm">
        <h1 className="font-semibold text-xl">Subir contenido</h1>

        <AccountDropdown user={user} />
      </header>
      {children}
    </div>
  );
}
