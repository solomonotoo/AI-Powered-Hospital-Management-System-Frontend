"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
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
import { getCurrentUser, clearAuth } from "@/lib/auth";
import { useFirstLoginPasswordChange } from "../hook/use-auth";
import { ShieldCheck, KeyRound, Building2, LogOut, CheckCircle2 } from "lucide-react";

const firstLoginSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FirstLoginFormValues = z.infer<typeof firstLoginSchema>;

export default function FirstLoginPasswordChangeForm() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const { mutate, isPending } = useFirstLoginPasswordChange();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/auth/login");
      return;
    }
    if (!currentUser.mustChangePassword) {
      router.push("/dashboard");
      return;
    }
    setUser(currentUser);
  }, [router]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FirstLoginFormValues>({
    resolver: zodResolver(firstLoginSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPasswordVal = watch("newPassword", "");

  const requirements = [
    { label: "At least 8 characters", met: newPasswordVal.length >= 8 },
    { label: "At least one uppercase letter (A-Z)", met: /[A-Z]/.test(newPasswordVal) },
    { label: "At least one lowercase letter (a-z)", met: /[a-z]/.test(newPasswordVal) },
    { label: "At least one number (0-9)", met: /[0-9]/.test(newPasswordVal) },
    { label: "At least one special character (!@#$%...)", met: /[^A-Za-z0-9]/.test(newPasswordVal) },
  ];

  const onSubmit = (data: FirstLoginFormValues) => {
    mutate({
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    });
  };

  return (
    <Card className="w-full max-w-lg border border-border shadow-xl bg-card">
      <CardHeader className="space-y-2 text-center pb-4">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-1">
          <ShieldCheck className="size-6" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
          First-Time Login Setup
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          For your account security, please set your permanent password before entering the system.
        </CardDescription>

        {user && (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-border/60 text-xs">
            <span className="font-semibold text-foreground">{user.fullName}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-primary font-medium">{user.role}</span>
            {user.facilityName && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Building2 className="size-3" />
                  {user.facilityName}
                </span>
              </>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup className="space-y-4">
            <Field>
              <FieldLabel htmlFor="newPassword">New Permanent Password</FieldLabel>
              <div className="relative">
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter secure new password"
                  autoComplete="new-password"
                  {...register("newPassword")}
                />
              </div>
              {errors.newPassword && (
                <FieldError>{errors.newPassword.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                autoComplete="new-password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <FieldError>{errors.confirmPassword.message}</FieldError>
              )}
            </Field>
          </FieldGroup>

          {/* Password criteria checklist */}
          <div className="rounded-lg bg-muted/40 p-3.5 border border-border/50 text-xs space-y-1.5">
            <span className="font-semibold text-foreground block mb-1">Password Requirements:</span>
            {requirements.map((req, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2
                  className={`size-3.5 transition-colors ${
                    req.met ? "text-emerald-500 fill-emerald-500/20" : "text-muted-foreground/50"
                  }`}
                />
                <span className={req.met ? "text-foreground font-medium" : "text-muted-foreground"}>
                  {req.label}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-2">
            <Button
              type="submit"
              className="w-full h-10 font-semibold"
              disabled={isPending}
            >
              {isPending ? (
                <span>Setting password...</span>
              ) : (
                <span className="flex items-center gap-2">
                  <KeyRound className="size-4" />
                  Set Password & Access Dashboard
                </span>
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => clearAuth()}
              className="w-full text-xs text-muted-foreground hover:text-destructive"
            >
              <LogOut className="size-3.5 mr-1" />
              Cancel & Sign Out
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
