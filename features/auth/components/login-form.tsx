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
  CardFooter,
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
import { loginSchema } from "../auth";
import ReusableImage from "@/features/web/reusable-image";

export default function LoginForm() {
  const formValidation = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
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
          />
        </div>
        <CardContent className="p-6 md:p-8 lg:p-10 space-y-6">
          <CardHeader>
            <CardTitle className=" text-center text-4xl font-bold">
              Login Form
            </CardTitle>
          </CardHeader>
          <CardDescription className="text-center">
            Login to access your account
          </CardDescription>
          <form className="mt-6">
            <FieldGroup className="space-y-5">
              <Controller
                name="username"
                control={formValidation.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Username</FieldLabel>
                    <Input
                      {...field}
                      placeholder="johndoe"
                      autoComplete="off"
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
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button className="w-full">Login</Button>
            </FieldGroup>
          </form>
          <FieldSeparator> OR </FieldSeparator>

          <div className="grid grid-cols-2 gap-2 mt-8">
            <Button variant="outline">
              <GoogleIcon />
              Signg with Google
            </Button>
            <Button variant="outline">
              <AppleIcon />
              Signg with Apple
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
