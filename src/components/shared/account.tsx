"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutController } from "@/interface-adapters/controller/logout.controller";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  AudioLinesIcon,
  CheckIcon,
  HomeIcon,
  ImageUpIcon,
  LogOut,
  MonitorIcon,
  MoonIcon,
  PlusIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
  VideoIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export const AccountDropdown = ({
  user,
}: {
  user: {
    email: string;
    user_metadata: {
      name: string;
    };
  };
}) => {
  const { theme, setTheme } = useTheme();

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case "light":
        return <SunIcon className="size-4" />;
      case "dark":
        return <MoonIcon className="size-4" />;
      case "system":
        return <MonitorIcon className="size-4" />;
    }
  };

  const getThemeLabel = (theme: string) => {
    switch (theme) {
      case "light":
        return "Claro";
      case "dark":
        return "Oscuro";
      case "system":
        return "Sistema";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          <Avatar className="size-10 cursor-pointer transition-opacity hover:opacity-80 bg-muted border-1 border-foreground/10 rounded-full">
            <AvatarImage
              src={"/placeholder.svg?height=40&width=40"}
              alt={user.user_metadata.name}
            />
            <AvatarFallback className="text-muted-foreground flex items-center justify-center rounded-full w-full h-full uppercase relative overflow-hidden">
              <UserIcon className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-1 size-8" />
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.user_metadata.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href="/"
              className="flex items-center cursor-pointer w-full"
            >
              <HomeIcon className="mr-2 size-4" />
              <span>Inicio</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/account"
              className="flex items-center cursor-pointer w-full"
            >
              <UserIcon className="mr-2 size-4" />
              <span>Mi cuenta</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/account/settings"
              className="flex items-center cursor-pointer w-full"
            >
              <SettingsIcon className="mr-2 size-4" />
              <span>Ajustes</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center cursor-pointer">
              <PlusIcon className="mr-2 size-4" />
              <span>Subir contenido</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem asChild>
                <Link
                  href="/upload/image"
                  className="flex items-center cursor-pointer w-full"
                >
                  <ImageUpIcon className="mr-2 size-4" />
                  <span>Subir imagen</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/upload/audio"
                  className="flex items-center cursor-pointer w-full"
                >
                  <AudioLinesIcon className="mr-2 size-4" />
                  <span>Subir audio</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/upload/video"
                  className="flex items-center cursor-pointer w-full"
                >
                  <VideoIcon className="mr-2 size-4" />
                  <span>Subir video</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/upload"
                  className="flex items-center cursor-pointer w-full"
                >
                  <PlusIcon className="mr-2 size-4" />
                  <span>Más</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center cursor-pointer gap-x-2">
              {getThemeIcon(theme ?? "light")}
              <span>Tema preferido</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {(["light", "dark", "system"] as string[]).map((_theme) => (
                <DropdownMenuItem
                  key={_theme}
                  onClick={() => setTheme(_theme)}
                  className="flex items-center cursor-pointer"
                >
                  {getThemeIcon(_theme)}
                  <span className="ml-2">{getThemeLabel(_theme)}</span>
                  {_theme === theme && <CheckIcon className="ml-auto size-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={async () => {
            await logoutController();
          }}
          className="flex items-center cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
        >
          <LogOut className="mr-2 size-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
