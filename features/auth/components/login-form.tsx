"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { GoogleIcon } from "../../icons";
import { AppleIcon } from "lucide-react";
import loginImage from "@/public/images/signup1.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema } from "../schema/auth";
import { useLogin } from "../hook/use-auth";
import ReusableImage from "@/features/web/reusable-image";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { mutate, isPending } = useLogin();

  const formValidation = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    mutate(data);
  };

  return (
    <Card className="w-full max-w-4xl overflow-hidden p-1 ring-0">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative p-2">
          <ReusableImage
            src={loginImage}
            fill
            width={160}
            height={60}
            objectFit="cover"
            rounded="lg"
            alt="Hospital interior illustration"
          />
        </div>
        <CardContent className="p-6 md:p-8 lg:p-10 space-y-6">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold">
              Login Form
            </CardTitle>
          </CardHeader>
          <CardDescription className="text-center">
            Login to access your account
          </CardDescription>
          <form
            className="mt-6"
            onSubmit={formValidation.handleSubmit(onSubmit)}
            noValidate
          >
            <FieldGroup className="space-y-5">
              <Controller
                name="email"
                control={formValidation.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Email Address</FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      placeholder="email@hospital.com"
                      autoComplete="email"
                      disabled={isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={formValidation.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Password</FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      placeholder="********"
                      autoComplete="current-password"
                      disabled={isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Logging in..." : "Login"}
              </Button>
            </FieldGroup>
          </form>
          <FieldSeparator> OR </FieldSeparator>

          <div className="grid grid-cols-2 gap-2 mt-8">
            <Button variant="outline" disabled={isPending}>
              <GoogleIcon />
              Sign in with Google
            </Button>
            <Button variant="outline" disabled={isPending}>
              <AppleIcon className="size-4 mr-2" />
              Sign in with Apple
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
