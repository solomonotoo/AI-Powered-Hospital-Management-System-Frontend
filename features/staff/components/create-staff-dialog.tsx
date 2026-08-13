import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { CreateStaffForm } from "./forms/create-staff-form";
import { Button } from "@/components/ui/button";
import { StaffFormValues } from "../schema/staff-schema";

interface CreateStafDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void; // Optional callback after successful creation
}

export function CreateStaffDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateStafDialogProps) {
  const handleSubmit = async (values: StaffFormValues) => {
    // Call your mutation/API here
    // await createStaff(values);

    onSuccess?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create Staff</DialogTitle>
          <DialogDescription>Add a new staff</DialogDescription>
        </DialogHeader>

        <CreateStaffForm onSubmit={handleSubmit} defaultValues={{}} />

        {/* <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
