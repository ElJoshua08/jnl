import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UploadItemCard } from "@/core/types/upload-item-card";
import Link from "next/link";

export const UploadItemsCards = ({ items }: { items: UploadItemCard[] }) => {
  return items.map((fileUploadType) => {
    return (
      <Link
        key={fileUploadType.id}
        href={fileUploadType.href}
        className="w-fit"
      >
        <Card className="min-w-md shadow-sm transition-all hover:scale-102 hover:shadow-lg group">
          <CardContent className="flex items-center justify-center py-5">
            <span className="rounded-full  transition-all p-4 border-1 shadow-sm bg-muted group-hover:shadow-lg group-hover:shadow-pink-300 group-hover:scale-110  group-hover:border-pink-300 group-hover:bg-pink-300 group-hover:text-white">
              <fileUploadType.icon className="size-20 stroke-[1.25px] p-2" />
            </span>
          </CardContent>
          <CardHeader>
            <CardTitle>{fileUploadType.name}</CardTitle>
            <CardDescription className="-mt-1">
              {fileUploadType.description}
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    );
  });
};
