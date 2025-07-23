"use client";

import { AccountDropdown } from "@/components/shared/account";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const CtaNav = ({
  user,
}: {
  user: {
    email: string;
    user_metadata: {
      name: string;
    };
  } | null;
}) => {
  return (
    <nav className="flex flex-row justify-between items-center py-4 border-b px-6">
      <Link
        href="/"
        className="text-xl font-medium"
      >
        J&L
      </Link>

      {user ? (
        <AccountDropdown user={user} />
      ) : (
        <Link
          href="/auth/login"
          className={buttonVariants({
            variant: "default",
          })}
        >
          Inicia Sesión
        </Link>
      )}
    </nav>
  );
};
