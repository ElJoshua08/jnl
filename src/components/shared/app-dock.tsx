"use client";

import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";
import { ImagesIcon, PlusIcon, UserIcon } from "lucide-react";
import Link from "next/link";

const data = [
  {
    title: "Gallery",
    icon: (
      <ImagesIcon className="h-full w-full text-foreground group-hover:text-background" />
    ),
    href: "/gallery",
  },
  {
    title: "Upload",
    icon: (
      <PlusIcon className="h-full w-full text-foreground group-hover:text-background" />
    ),
    href: "/upload",
  },
  {
    title: "Account",
    icon: (
      <UserIcon className="h-full w-full text-foreground group-hover:text-background" />
    ),
    href: "/account",
  },
];

export const AppDock = () => {
  return (
    <div className="absolute bottom-6 left-1/2 max-w-full -translate-x-1/2 z-50">
      <Dock
        className="items-end pb-3 !bg-background/50 backdrop-blur-xl"
        spring={{
          stiffness: 100,
          damping: 10,
          mass: 0.5,
        }}
        magnification={60}
        distance={100}
      >
        {data.map((item, idx) => (
          <Link
            href={item.href}
            key={idx}
          >
            <DockItem className="aspect-square rounded-full bg-background/50 hover:bg-foreground group transition-all duration-100">
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          </Link>
        ))}
      </Dock>
    </div>
  );
};
