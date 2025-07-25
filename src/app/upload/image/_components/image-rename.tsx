import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const renameSchema = z.object({
  name: z.string().min(3, "Al menos 3 caracteres"),
});

type RenameForm = z.infer<typeof renameSchema>;

export const ImageRename = ({
  open,
  onOpenChange,
  onRename,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRename: (newName: string) => void;
}) => {
  const form = useForm<RenameForm>({
    resolver: zodResolver(renameSchema),
    defaultValues: {
      name: "",
    },
  });

  async function handleSubmit(data: RenameForm) {
    onRename(data.name);
    onOpenChange(false);
  }
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader className="mb-6">
          <DialogTitle>Renombrar imagen</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form {...form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Nombre del dia (dia en la playita...)"
                  />
                </FormControl>
                <FormDescription />
              </FormItem>
            )}
          />
        </Form>
        <DialogFooter>
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
          >
            Cancelar
          </Button>
          <Button onClick={form.handleSubmit(handleSubmit)}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
