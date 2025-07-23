import { redirect } from "next/navigation";

// Redirects to login page
export function GET() {
  return redirect("/auth/login");
}
