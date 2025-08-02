"use server";

import { getInjection } from "@/core/di/container";
import { AuthUser } from "@/entities/models/auth-user.entity";

function presenter(user: AuthUser | null) {
  if (!user) {
    return null;
  }

  return {
    email: user.email,
    user_metadata: user.user_metadata,
  };
}

export async function getUserController() {
  const authService = getInjection("IAuthService");

  try {
    const user = await authService.getCurrentUser();
    return presenter(user);
  } catch (e) {
    return null;
  }
}
