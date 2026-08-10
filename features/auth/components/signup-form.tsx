"use client";

import React from "react";
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
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import signupImage from "@/public/images/signup1.jpg";
import { signupSchema } from "../schema/auth";
import { useCreateCredentials } from "../hook/use-auth";
import ReusableImage from "@/features/web/reusable-image";

type CreateCredentialsValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const { mutate, isPending } = useCreateCredentials();

  const formValidation = useForm<CreateCredentialsValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      staffId: "",
      loginEmail: "",
      temporaryPassword: "",
    },
  });

  const onSubmit = (data: CreateCredentialsValues) => {
    mutate(data, {
      onSuccess: () => {
        formValidation.reset();
      },
    });
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
            <CardTitle className="flex items-center justify-center text-4xl font-bold text-center">
              Create Credentials
            </CardTitle>
          </CardHeader>
          <CardDescription className="text-center">
            Register temporary login credentials for a staff member.
          </CardDescription>

          <form
            className="mt-6"
            onSubmit={formValidation.handleSubmit(onSubmit)}
            noValidate
          >
            <FieldGroup className="space-y-5">
              <Controller
                name="staffId"
                control={formValidation.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Staff Member ID (UUID)</FieldLabel>
                    <Input
                      {...field}
                      placeholder="e.g. 123e4567-e89b-12d3-a456-426614174000"
                      autoComplete="off"
                      disabled={isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="loginEmail"
                control={formValidation.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Login Email Address</FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      placeholder="staff@hospital.com"
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
                name="temporaryPassword"
                control={formValidation.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Temporary Password</FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      placeholder="********"
                      autoComplete="new-password"
                      disabled={isPending}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field orientation="horizontal">
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Creating..." : "Create Credentials"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </div>
    </Card>
  );
}
