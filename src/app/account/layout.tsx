import { AppDock } from "@/components/shared/app-dock";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppDock />
      {children}
    </>
  );
}
