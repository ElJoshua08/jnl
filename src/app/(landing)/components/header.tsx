"use client";

import { AuthUser } from "@supabase/supabase-js";

const links = [
  {
    name: "Inicio",
    href: "/",
  },
  {
    name: "Galería",
    href: "/gallery",
  },
];

export const Header = ({ user }: { user?: AuthUser }) => {
  return (
    <nav className="flex flex-row justify-between items-center py-4 px-6  w-full z-50 ">
      {/* <Link
        href="/"
        className="text-xl font-header font-black"
      >
        J&L
      </Link> */}
    </nav>
  );
};
