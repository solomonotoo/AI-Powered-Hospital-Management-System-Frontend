import { Icon, LucideIcon } from "lucide-react";

// This component will be useful for pages such as:

// No visits
// No allergies
// No lab requests
// No medications
// No appointments
interface EmptyStateProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function EmptyState({
  title,
  description,
  icon: Icon,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed p-10 text-center">
      <Icon className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
