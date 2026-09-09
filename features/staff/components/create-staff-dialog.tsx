import React from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateStaffForm } from "./forms/create-staff-form";
import { StaffFormValues } from "../schema/staff-schema";
import { useCreateStaff } from "../hooks/use-create-staff";
import { toCreateStaffRequest } from "../mapper/staff-mapper";

interface CreateStaffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void; // Optional callback after successful creation
}

export function CreateStaffDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateStaffDialogProps) {
  const { mutateAsync: createStaff } = useCreateStaff();

  const handleSubmit = async (values: StaffFormValues) => {
    try {
      const payload = toCreateStaffRequest(values);
      await createStaff(payload);
      toast.success("Staff member created successfully");
      onSuccess?.();
      onOpenChange(false);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      const errorMessage =
        err?.response?.data?.message || err?.message || "Failed to create staff member";
      toast.error(errorMessage);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Staff</DialogTitle>
          <DialogDescription>Add a new staff member</DialogDescription>
        </DialogHeader>

        <CreateStaffForm onSubmit={handleSubmit} defaultValues={{}} />
      </DialogContent>
    </Dialog>
  );
}

