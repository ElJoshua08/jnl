"use server"

import { getInjection } from "@/core/di/container";

export async function logoutController(): Promise<void> {
  const authService = getInjection("IAuthService");
  await authService.logout();
}
