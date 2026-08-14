import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface WizardNavigationProps {
  isFirst: boolean;
  isLast: boolean;
  loading: boolean;
  onNext: () => void | Promise<void>;
  onBack: () => void;
  onSubmit: () => void | Promise<void>;
}

export function WizardNavigation({
  isFirst,
  isLast,
  loading,
  onNext,
  onBack,
  onSubmit,
}: WizardNavigationProps) {

  // const handleNext = async (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.preventDefault();
  //   event.stopPropagation();

  //   await onNext();
  // };

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
        <Button type="button" onClick={onSubmit} disabled={loading}>
          {loading ? (
            <>
              <Spinner className="mr-2 h-4 w-4 animate-spin" />
              Registering...
            </>
          ) : (
            "Register staff"
          )}
        </Button>
      ) : (
        <Button type="button" onClick={onNext} disabled={loading}>
          Next
        </Button>
      )}
    </div>
  );
}
