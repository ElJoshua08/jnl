import { resendSignupEmailAction } from "@/app/auth/actions";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const SuccessDialog = ({ email }: { email: string }) => {
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown <= 0) {
        return;
      }
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  });

  async function handleClick() {
    const { error } = await resendSignupEmailAction(email);

    if (error) {
      toast.error(error.message);
      return;
    }

    setCountdown(30);
  }

  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¡Te has registrado correctamente!</AlertDialogTitle>
          <AlertDialogDescription>
            Por favor, confirma tu correo electrónico antes de iniciar sesión.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center justify-center py-10">
          <HeartIcon className=" text-red-500 fill-red-500 size-24 " />
        </div>
        <AlertDialogFooter className="justify-between flex flex-row items-center w-full">
          <span className="text-xs text-muted-foreground">
            {countdown > 0 &&
                `${countdown} segundos restantes`
            }
          </span>

          <Button
            variant="outline"
            className="w-fit"
            disabled={countdown > 0}
            onClick={handleClick}
            loadOnClick
          >
            Reenviar email
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
