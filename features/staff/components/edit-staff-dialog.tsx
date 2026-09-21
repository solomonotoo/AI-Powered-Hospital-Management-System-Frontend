"use client";

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
import { useUpdateStaff } from "../hooks/use-staff-update";
import { toStaffFormValues, toUpdateStaffRequest } from "../mapper/staff-mapper";
import { Staff } from "../types/staff";

interface EditStaffDialogProps {
  staff: Staff | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function EditStaffDialog({
  staff,
  open,
  onOpenChange,
  onSuccess,
}: EditStaffDialogProps) {
  const { mutateAsync: updateStaff } = useUpdateStaff();

  const handleSubmit = async (values: StaffFormValues) => {
    if (!staff?.id) return;
    try {
      const payload = toUpdateStaffRequest(values);
      await updateStaff({ id: staff.id, data: payload });
      toast.success("Staff member updated successfully");
      onSuccess?.();
      onOpenChange(false);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      const errorMessage =
        err?.response?.data?.message || err?.message || "Failed to update staff member";
      toast.error(errorMessage);
    }
  };

  const defaultValues = React.useMemo(
    () => (staff ? toStaffFormValues(staff) : {}),
    [staff]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Staff</DialogTitle>
          <DialogDescription>
            Update details for {staff ? `${staff.firstName} ${staff.lastName}` : "staff member"}{" "}
            {staff?.employeeId ? `(${staff.employeeId})` : ""}
          </DialogDescription>
        </DialogHeader>

        {open && staff && (
          <CreateStaffForm
            key={`${staff.id}-${open}`}
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
