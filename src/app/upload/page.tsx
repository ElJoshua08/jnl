"use server";

import { UploadForm } from "@/app/upload/components/upload-form";
import { AppDock } from "@/components/shared/app-dock";
import { getUser } from "@/services/supabase/get-user.service";

export default async function UploadPage() {
  const { data: user } = await getUser();

  return (
    <main className="flex w-full h-dvh items-start justify-start">
      <UploadForm />

      <AppDock />
    </main>
  );
}
