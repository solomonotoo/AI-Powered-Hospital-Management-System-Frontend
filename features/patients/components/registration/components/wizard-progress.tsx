// ---------------------------------------------------------------------------
// wizard steps
// ---------------------------------------------------------------------------

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { wizardSteps } from "../wizard-steps";

// ---------------------------------------------------------------------------
// Progress bar
// ---------------------------------------------------------------------------
interface WizardProgressProps {
  steps: typeof wizardSteps;
  activeIndex: number;
}
export function WizardProgress({ steps, activeIndex }: WizardProgressProps) {
  return (
    <ol className="flex w-full items-center">
      {steps.map((step, index) => {
        const done = index < activeIndex;
        const active = index === activeIndex;
        return (
          <li key={step.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-medium transition-colors",
                  done && "border-primary bg-primary text-primary-foreground",
                  active && "border-primary text-primary",
                  !done &&
                    !active &&
                    "border-muted-foreground/30 text-muted-foreground"
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : index + 1}
              </div>
              <span
                className={cn(
                  "hidden text-[11px] sm:block",
                  active ? "font-medium" : "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
            </div>
            {index < wizardSteps.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-px flex-1 transition-colors",
                  done ? "bg-primary" : "bg-muted-foreground/30"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
