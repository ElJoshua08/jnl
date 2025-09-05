"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";

export default function AccountPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-center w-full h-dvh flex-col gap-y-6">
      <div className="min-w-md">
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-lg font-bold">Account</h2>
            <p className="text-sm text-muted-foreground">
              Manage your account settings and preferences.
            </p>
          </div>

          <div className="flex flex-col gap-y-2">
            <h2 className="text-lg font-bold">Profile</h2>
            <p className="text-sm text-muted-foreground">
              Manage your profile information, including your name and email.
            </p>
          </div>

          <div className="flex flex-col gap-y-2">
            <h2 className="text-lg font-bold">Security</h2>
            <p className="text-sm text-muted-foreground">
              Manage your account security settings.
            </p>
          </div>

          <div className="flex flex-col gap-y-2">
            <h2 className="text-lg font-bold">Billing</h2>
            <p className="text-sm text-muted-foreground">
              Manage your billing and payment information.
            </p>
          </div>
        </div>
      </div>

      <Select
        value={theme}
        onValueChange={setTheme}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Claro</SelectItem>
          <SelectItem value="dark">Oscuro</SelectItem>
          <SelectItem value="system">Sistema</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
