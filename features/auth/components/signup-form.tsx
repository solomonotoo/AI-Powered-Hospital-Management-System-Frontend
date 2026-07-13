"use client";

import React from "react";
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

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import signupImage from "@/public/images/signup1.jpg";
import { signupSchema } from "../auth";
import ReusableImage from "@/features/web/reusable-image";

export default function SignupForm() {
  const formValidation = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (data: z.infer<typeof signupSchema>) => {
    // TODO: wire up to actual signup API call
    console.log(data);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden p-1 ring-0">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative p-2">
          <ReusableImage
            src={signupImage}
            alt="Person signing up for an account"
            fill
            width={160}
            height={60}
            objectFit="cover"
            rounded="lg"
          />
        </div>
        <CardContent className="p-6 md:p-8 lg:p-10 space-y-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-5xl font-bold">
              Signup Form
            </CardTitle>
          </CardHeader>
          <CardDescription className="text-center">
            Create an account to get started
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
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      placeholder="johndoe@example.com"
                      autoComplete="email"
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
                      autoComplete="new-password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="phoneNumber"
                control={formValidation.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Phone number</FieldLabel>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="+233 24 000 0000"
                      autoComplete="tel"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field orientation="horizontal">
                <Button type="submit" className="w-full">
                  Signup
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </div>
    </Card>
  );
}
