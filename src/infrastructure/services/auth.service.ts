import { IAuthService } from "@/application/services/auth-service.interface";
import { AuthenticationError } from "@/entities/errors/auth.error";
import { AuthUser } from "@/entities/models/auth-user.entity";
import { createClient } from "@/infrastructure/utils/supabase/server";
import { EmailOtpType } from "@supabase/supabase-js";
import { injectable } from "inversify";

@injectable()
export class AuthService implements IAuthService {
  constructor() {}

  async getCurrentUser() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      if (error.status === 400) {
        return null;
      }

      throw new AuthenticationError(error.message, {
        cause: error,
      });
    }

    return {
      id: data.user.id,
      email: data.user.email,
      user_metadata: data.user.user_metadata,
    } as AuthUser;
  }

  async login(email: string, password: string) {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new AuthenticationError(error.message, {
        cause: error.cause,
      });
    }
  }

  async signup(email: string, password: string, name: string) {
    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: name,
          name,
        },
        emailRedirectTo: `/`,
      },
    });

    if (error) {
      throw new AuthenticationError(error.message, {
        cause: error,
      });
    }
  }

  async logout() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new AuthenticationError(error.message, {
        cause: error,
      });
    }
  }

  async verifyOtp(token_hash: string, type: EmailOtpType) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    });

    if (error) {
      throw new AuthenticationError(error.message, {
        cause: error,
      });
    }
  }

  async resendSignupEmail(email: string) {
    const supabase = await createClient();
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/`,
      }
    });

    if (error) {
      throw new AuthenticationError(error.message, {
        cause: error,
      });
    }
  }
}
