import { Button } from "@/components/ui/button";
import { useState } from "react";

interface WizardNavigationProps {
  isFirst: boolean;

  isLast: boolean;

  loading: boolean;

  onNext: () => void | Promise<void>;
  onBack: () => void;
}

export function WizardNavigation({
  isFirst,
  isLast,
  loading,
  onNext,
  onBack,
}: WizardNavigationProps) {
  return (
    <div className="mt-8 flex justify-between border-t pt-6">
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        disabled={isFirst || loading}
      >
        Back
      </Button>
      {isLast ? (
        <Button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register patient"}
        </Button>
      ) : (
        <Button type="button" onClick={onNext} disabled={loading}>
          Next
        </Button>
      )}
    </div>
  );
}
