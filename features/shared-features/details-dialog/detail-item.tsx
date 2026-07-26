//this component is for items details to be displayed in details-dialog.tsx

import { ReactNode } from "react";

interface DetailItemProps {
  label: string;
  value: ReactNode;
}

export function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="grid  md:grid-cols-[180px_1fr] gap-2 py-2">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>

      <div className="text-sm">{value}</div>
    </div>
  );
}
