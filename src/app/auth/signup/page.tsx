"use client";

import { signupAction } from "@/app/auth/actions";
import { SuccessDialog } from "@/app/auth/signup/success";
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
import { signUpForm, SignUpForm } from "@/schemas/signup.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginPage() {
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);
  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleSubmit(data: SignUpForm) {
    const { success, error } = await signupAction(data);

    if (error) {
      toast.error(error.message);
      return;
    }

    setSuccessfulSubmit(true);
  }

  return (
    <div className="flex items-center justify-center w-full h-dvh flex-col gap-y-6">
      {successfulSubmit && <SuccessDialog email={form.getValues().email} />}
      <Card className="min-w-md">
        <CardHeader>
          <CardTitle>Registrate en J&L</CardTitle>
          <CardDescription>
            Crea tu cuenta para poder acceder a tus fotitos y recuerdos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nombre de usuario"
                      />
                    </FormControl>
                    <FormDescription>
                      Elige el nombre de usuario que quieres tener.
                    </FormDescription>
                  </FormItem>
                )}
              />

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
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <InputPassword {...field} />
                    </FormControl>
                    <FormDescription>
                      Crea una contraseña segura.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <FormControl>
                      <InputPassword {...field} />
                    </FormControl>
                    <FormDescription>Confirma tu contraseña.</FormDescription>
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
            Crea tu cuenta
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
        href="/auth/login"
        className="text-xs no-underline hover:underline hover:text-foreground text-muted-foreground transition-all"
      >
        Ya tengo cuenta
      </Link>
    </div>
  );
}
