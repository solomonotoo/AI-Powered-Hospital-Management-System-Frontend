"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { KeyRound, Check, Loader2, Info } from "lucide-react";
import { toast } from "sonner";
import { useCreatePermission } from "@/features/user-acount-module/hook/use-create-permission";

interface CreatePermissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Common domain module prefixes to facilitate naming consistency across hospital microservices
const SUGGESTED_PREFIXES = [
  "PATIENT",
  "USER",
  "STAFF",
  "FACILITY",
  "BILLING",
  "ADMISSION",
  "LAB",
  "PHARMACY",
  "ROLE",
];

export function CreatePermissionDialog({
  open,
  onOpenChange,
}: CreatePermissionDialogProps) {
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  // Mutation hook backed by OpenAPI POST /api/v1/permissions
  const { mutate: createPermission, isPending } = useCreatePermission();

  const resetForm = () => {
    setCode("");
    setDescription("");
  };

  // Helper to format permission code string to uppercase snake_case
  const handleCodeChange = (raw: string) => {
    // Replace spaces and special characters with underscores, keeping alphanumeric
    const formatted = raw
      .toUpperCase()
      .replace(/[\s-]+/g, "_")
      .replace(/[^A-Z0-9_]/g, "");
    setCode(formatted);
  };

  // Quick-fill prefix helper
  const handleSelectPrefix = (prefix: string) => {
    if (!code || !code.includes("_")) {
      setCode(`${prefix}_`);
    } else {
      const parts = code.split("_");
      parts[0] = prefix;
      setCode(parts.join("_"));
    }
  };

  // Submit handler matching OpenAPI CreatePermissionRequest
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validation: code is required
    const trimmedCode = code.trim();
    if (!trimmedCode) {
      toast.error("Please enter a permission code");
      return;
    }

    // 2. Validation: Code format recommendation (MODULE_ACTION)
    if (!trimmedCode.includes("_") || trimmedCode.endsWith("_")) {
      toast.error(
        "Please follow the MODULE_ACTION naming convention (e.g., PATIENT_EXPORT, BILLING_APPROVE)"
      );
      return;
    }

    // 3. Execute OpenAPI createPermission mutation
    createPermission(
      {
        code: trimmedCode,
        description: description.trim() || undefined,
      },
      {
        onSuccess: () => {
          toast.success(`Permission "${trimmedCode}" created successfully!`);
          resetForm();
          onOpenChange(false);
        },
        onError: (err) => {
          const message =
            err instanceof Error ? err.message : "Failed to create permission";
          toast.error(message);
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) resetForm();
        onOpenChange(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <KeyRound className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-lg">Add New Permission</DialogTitle>
              <DialogDescription className="text-xs">
                Register a new operational capability in the system permissions catalog.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Permission Code */}
          <div className="space-y-1.5">
            <Label
              htmlFor="perm-code"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Permission Code <span className="text-destructive">*</span>
            </Label>
            <Input
              id="perm-code"
              placeholder="e.g., PATIENT_EXPORT, BILLING_APPROVE"
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              disabled={isPending}
              required
              className="font-mono text-sm uppercase"
            />
            <p className="text-[11px] text-muted-foreground">
              Standard format: <code className="font-semibold text-foreground">MODULE_ACTION</code>
            </p>
          </div>

          {/* Quick Category Suggestion Badges */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-medium text-muted-foreground">
              Quick Module Prefix:
            </span>
            <div className="flex flex-wrap gap-1">
              {SUGGESTED_PREFIXES.map((prefix) => (
                <Badge
                  key={prefix}
                  variant="outline"
                  className="cursor-pointer text-[10px] hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => handleSelectPrefix(prefix)}
                >
                  +{prefix}
                </Badge>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label
              htmlFor="perm-desc"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Description <span className="text-muted-foreground text-[11px] font-normal">(Optional)</span>
            </Label>
            <Textarea
              id="perm-desc"
              placeholder="Explain the security capability granted by this permission code..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isPending}
              rows={2}
              className="resize-none text-sm"
            />
          </div>

          {/* RBAC Inheritance Note */}
          <div className="flex items-start gap-2 rounded-lg border bg-muted/40 p-3 text-xs text-muted-foreground">
            <Info className="size-4 shrink-0 text-primary mt-0.5" />
            <span>
              Once registered, this permission can be bundled into new or existing roles, granting access to users assigned those roles.
            </span>
          </div>

          <DialogFooter className="mt-4 gap-2 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || !code.trim()}
              className="gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Check className="size-4" />
                  Create Permission
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
