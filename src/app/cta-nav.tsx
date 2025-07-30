"use client";

import { AccountDropdown } from "@/components/shared/account";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Inicio",
    href: "/",
  },
  {
    name: "Galería",
    href: "/gallery",
  }
]

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

  const pathname = usePathname();

  return (
    <nav className="flex flex-row justify-between items-center py-4 border-b px-6 backdrop-blur-xl bg-background/50 fixed top-0 left-0 w-full z-20">
      <Link
        href="/"
        className="text-xl font-header font-black"
      >
        J&L
      </Link>

      <ul className="flex flex-row gap-x-12">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={isActive ? "" : link.href}
              className={`text-lg font-header font-normal transition-all duration-100 ${isActive ? "text-pink-800 dark:text-pink-400" : "text-muted-foreground hover:text-foreground hover:underline underline-offset-2"}`}
            >
              {link.name}
            </Link>
          );
        })}
      </ul>

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
