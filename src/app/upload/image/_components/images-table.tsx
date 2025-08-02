"use client";

import { ImageCrop } from "@/app/upload/image/_components/image-crop";
import { ImageDelete } from "@/app/upload/image/_components/image-delete";
import { ImageRename } from "@/app/upload/image/_components/image-rename";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import {
  EditIcon,
  EllipsisIcon,
  ImageIcon,
  LanguagesIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function ImagesTable({
  images,
  onUpdate,
  onDelete,
}: {
  images: File[];
  onUpdate: (file: File, newFile: File) => void;
  onDelete: (file: File) => void;
}) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  function handleOpenDialog(image: File, type: "edit" | "rename" | "delete") {
    setSelectedImage(image);
    switch (type) {
      case "edit":
        setEditOpen(true);
        break;
      case "rename":
        setRenameOpen(true);
        break;
      case "delete":
        setDeleteOpen(true);
        break;
    }
  }

  function handleRename(newName: string) {
    if (!selectedImage) {
      toast.error("Selecciona una imagen para renombrarla");
      return;
    }

    const newImage = new File(
      [selectedImage],
      `${newName}.${selectedImage.name.split(".").pop()}`,
      {
        type: selectedImage.type,
        lastModified: selectedImage.lastModified,
      }
    );

    onUpdate(selectedImage, newImage);
  }

  function handleDelete() {
    if (!selectedImage) {
      toast.error("Selecciona una imagen para eliminarla");
      return;
    }
    onDelete(selectedImage);
  }

  function handleCrop(newFile: File) {
    if (!selectedImage) {
      toast.error("Selecciona una imagen para actualizarla");
      return;
    }
    onUpdate(selectedImage, newFile);
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  }

  function getFileNameWithoutExtension(fileName: string) {
    const parts = fileName.split(".");
    return parts.slice(0, parts.length - 1).join(".");
  }

  function getFileExtension(type: string): string {
    return type.split("/").pop()?.toUpperCase() || "";
  }

  return (
    <Card className="w-full h-full border-2 border-border/50 hover:border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <ImageIcon className="size-5 text-primary" />
          Galería de Imágenes
          <Badge
            variant="secondary"
            className="ml-auto hidden lg:block"
          >
            {images.length} {images.length === 1 ? "imagen" : "imágenes"}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 h-full overflow-y-scroll flex-1">
        {images.length > 0 ? (
          <>
            {selectedImage && (
              <>
                <ImageCrop
                  onCrop={handleCrop}
                  image={selectedImage}
                  open={editOpen}
                  onOpenChange={setEditOpen}
                />
                <ImageDelete
                  onDelete={handleDelete}
                  open={deleteOpen}
                  onOpenChange={setDeleteOpen}
                />
                <ImageRename
                  onRename={handleRename}
                  open={renameOpen}
                  onOpenChange={setRenameOpen}
                />
              </>
            )}

            <div className="border-t border-border/50">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-border/50">
                    <TableHead className="font-semibold text-foreground px-6 py-4">
                      Imagen
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Tipo
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Tamaño
                    </TableHead>
                    <TableHead className="text-right font-semibold text-foreground pr-6">
                      Acciones
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {images.map((image, index) => {
                    return (
                      <TableRow
                        key={image.name}
                        className={`
                          transition-all duration-200 ease-in-out
                          hover:bg-muted/50 hover:shadow-sm
                        `}
                      >
                        <TableCell className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="size-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden">
                              <img
                                src={URL.createObjectURL(image)}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-foreground truncate max-w-[200px] hidden lg:block">
                                {getFileNameWithoutExtension(image.name)}
                              </span>
                              <span className="text-xs text-muted-foreground hidden lg:block">
                                Modificado{" "}
                                {formatDistanceToNow(image.lastModified, {
                                  locale: es,
                                  addSuffix: true,
                                })}
                              </span>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant="outline"
                            className="font-mono text-xs transition-colors duration-200 hover:bg-primary/10"
                          >
                            {getFileExtension(image.type)}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <span className="text-sm text-muted-foreground font-medium">
                            {formatFileSize(image.size)}
                          </span>
                        </TableCell>

                        <TableCell className="text-right pr-6">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                className={`
                                  p-2 rounded-lg transition-all duration-200
                                  hover:bg-pink-300 hover:shadow-sm
                                  focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer group
                                `}
                              >
                                <EllipsisIcon className="size-4 text-muted-foreground group-hover:text-white transition-colors" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="w-48 shadow-lg border-2 animate-in slide-in-from-top-2 duration-200"
                            >
                              <DropdownMenuLabel className="font-semibold">
                                Acciones
                              </DropdownMenuLabel>
                              <DropdownMenuGroup>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleOpenDialog(image, "edit")
                                  }
                                  className="cursor-pointer hover:bg-primary/10 transition-colors duration-150"
                                >
                                  <EditIcon className="size-4 mr-2 text-blue-500" />
                                  Editar imagen
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleOpenDialog(image, "rename")
                                  }
                                  className="cursor-pointer hover:bg-primary/10 transition-colors duration-150"
                                >
                                  <LanguagesIcon className="size-4 mr-2 text-amber-500" />
                                  Renombrar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleOpenDialog(image, "delete")
                                  }
                                  className="cursor-pointer hover:bg-destructive/10 text-destructive hover:text-destructive transition-colors duration-150"
                                >
                                  <TrashIcon className="size-4 mr-2" />
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </>
        ) : (
          <div className="w-full min-h-56 h-full flex flex-col items-center justify-center p-8 border-t border-border/50">
            <div className="size-20 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center mb-4">
              <ImageIcon className="size-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-2">
              No hay imágenes
            </h3>
            <p className="text-muted-foreground text-center max-w-sm leading-relaxed">
              Tu galería está vacía. Las imágenes que agregues aparecerán aquí.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ImagesTable;
