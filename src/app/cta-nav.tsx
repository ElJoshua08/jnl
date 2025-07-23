import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage />
              <AvatarFallback>
                {user.user_metadata.name.split("")[0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
        </DropdownMenu>
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
