"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateCredentialForm } from "./forms/create-credential-form";
import { CreateCredentialFormValues } from "../schema/credential-schema";
import { useCreateCredential } from "../hook/use-create-credential";
import { KeyRound } from "lucide-react";

interface CreateCredentialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateCredentialDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateCredentialDialogProps) {
  // Mutation hook for provisioning credentials via /api/v1/auth/credentials
  const { mutateAsync: createCredential, isPending } = useCreateCredential();

  // Submit handler passed to the modern credential form
  const handleSubmit = async (values: CreateCredentialFormValues) => {
    // Send CreateCredentialRequest matching OpenAPI schema
    await createCredential({
      staffId: values.staffId,
      loginEmail: values.loginEmail,
      temporaryPassword: values.temporaryPassword,
    });
    // Trigger parent callback to refetch users table/summary if needed
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-semibold">
                Create User Credentials
              </DialogTitle>
              <DialogDescription className="text-xs">
                Provision a new authentication account for hospital staff based on OpenAPI schema.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Modern credential creation form */}
        <CreateCredentialForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
