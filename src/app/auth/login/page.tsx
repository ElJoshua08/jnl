"use client";

import { loginAction } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input, InputPassword } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  LoginForm,
  loginForm,
} from "@/interface-adapters/validation-schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginPage() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit(data: LoginForm) {
    const { error } = await loginAction(data);

    if (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-dvh flex-col gap-y-6">
      <Card className="min-w-md">
        <CardHeader>
          <CardTitle>Inicia Sesión</CardTitle>
          <CardDescription>
            Inicia Sesión para acceder a tu cuenta &lt;3
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-10">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="example@jnl.com"
                      />
                    </FormControl>
                    <FormDescription>
                      El correo con el que te registraste.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="inline-flex justify-between items-center w-full">
                      Contraseña
                      <Link
                        href="/auth/forgot-password"
                        className="text-xs text-muted-foreground
                      transition-all duration-100 hover:underline hover:text-foreground"
                      >
                        Olvidé mi contraseña
                      </Link>
                    </FormLabel>
                    <FormControl>
                      <InputPassword {...field} />
                    </FormControl>
                    <FormDescription>La contraseña que usaste.</FormDescription>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col gap-y-4 mt-6">
          <Button
            className="w-full"
            onClick={form.handleSubmit(handleSubmit)}
            loadOnClick
          >
            Iniciar Sesión
          </Button>

          <Separator />

          <Button
            variant="outline"
            className="w-full"
            loadOnClick
            onClick={() => {
              throw new Error("Not implemented");
            }}
          >
            Continua con google
          </Button>
        </CardFooter>
      </Card>
      <Link
        href="/auth/signup"
        className="text-sm no-underline hover:underline hover:text-foreground text-muted-foreground transition-all"
      >
        Aún no tengo cuenta
      </Link>
    </div>
  );
}
