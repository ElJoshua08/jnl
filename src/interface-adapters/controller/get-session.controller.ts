"use server";

import { getInjection } from "@/core/di/container";
import { AuthSession } from "@/entities/models/auth-session";

export async function getSessionController(): Promise<AuthSession | null> {
  const authService = getInjection("IAuthService");

  try {
    return await authService.getSession();
  } catch (error) {
    throw error;
  }
}
