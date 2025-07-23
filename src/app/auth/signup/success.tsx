import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScanHeartIcon } from "lucide-react";

export const SuccessDialog = () => {
  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¡Te has registrado correctamente!</AlertDialogTitle>
          <AlertDialogDescription>
            Por favor, confirma tu correo electrónico antes de iniciar sesión.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center justify-center">
          <ScanHeartIcon className=" text-red-500 size-24 bg-red-200 rounded-full p-3" />
        </div>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
