import { EmailOtpType, ResendEmailType } from "@/core/types/email-otp";
import { AuthUser } from "@/entities/models/auth-user.entity";

export interface IAuthService {
  getCurrentUser(): Promise<AuthUser | null>;
  login(email: string, password: string): Promise<void>;
  signup(email: string, password: string, name: string): Promise<void>;
  verifyOtp(token_hash: string, type: EmailOtpType): Promise<void>;
  resendSignupEmail(email: string): Promise<void>;
  logout(): Promise<void>;
}
