import { EmailOtpType } from "@/core/types/email-otp";
import { AuthSession } from "@/entities/models/auth-session";
import { AuthUser } from "@/entities/models/auth-user.entity";

export interface IAuthService {
  getCurrentUser(): Promise<AuthUser | null>;
  getSession(): Promise<AuthSession | null>;
  login(email: string, password: string): Promise<void>;
  signup(email: string, password: string, name: string): Promise<AuthUser>;
  verifyOtp(token_hash: string, type: EmailOtpType): Promise<void>;
  resendSignupEmail(email: string): Promise<void>;
  logout(): Promise<void>;
}
