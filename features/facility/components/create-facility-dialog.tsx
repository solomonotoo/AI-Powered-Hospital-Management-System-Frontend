import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { AppFormField } from "@/features/forms/fields/app-form-field";
import { Facility } from "../types";
import { UseFormReturn } from "react-hook-form";
import { CreateFacilityForm } from "../forms/create-facility-form";
import { useRef, useState } from "react";
import { FacilityFormValues } from "../schema/facility-schema";
import { toast } from "sonner";

interface FacilityFormProps {
  form: UseFormReturn<Facility>;
}

interface CreateFacilityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void; // Optional callback after successful creation
}

export function CreateFacilityDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateFacilityDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<{ submit: () => void }>(null);

  const handleSubmit = async (values: FacilityFormValues) => {
    try {
      setIsSubmitting(true);

      //Here you make your API call
      console.log("Form Values", values);

      //simulate api call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Facility created successfully");
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to create facility");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = () => {
    formRef.current?.submit(); // Trigger form submission
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[100vh] overflow-y-auto ring-0">
        <DialogHeader>
          <DialogTitle>Create Facility</DialogTitle>
          <DialogDescription>Add a new Hospital</DialogDescription>
        </DialogHeader>

        <CreateFacilityForm ref={formRef} onSubmit={handleSubmit} />

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
