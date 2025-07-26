import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type UploadLink } from "@/core/types/upload-link";
import Link from "next/link";

export const UploadLinkCard = ({ link }: { link: UploadLink }) => {
  return (
    <Link
      key={link.id}
      href={link.href}
      className="max-w-lg w-full shrink"
    >
      <Card className="max-w-lg w-full shadow-sm transition-all hover:scale-102 hover:shadow-lg group">
        <CardContent className="flex items-center justify-center py-5">
          <span className="rounded-full  transition-all p-4 border-1 shadow-sm bg-muted group-hover:shadow-lg group-hover:shadow-pink-300 group-hover:scale-110  group-hover:border-pink-300 group-hover:bg-pink-300 group-hover:text-white">
            <link.icon className="size-20 stroke-[1.25px] p-2" />
          </span>
        </CardContent>
        <CardHeader>
          <CardTitle>{link.name}</CardTitle>
          <CardDescription className="-mt-1">
            {link.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
