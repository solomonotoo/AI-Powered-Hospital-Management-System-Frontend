

import { StaffFormStepProps } from '@/features/staff/types/staff';
import { useWatch } from 'react-hook-form';

export  function ReviewStep({ form }: StaffFormStepProps) {
    const { control } = form;
  const v = useWatch({ control });
  const summary = [
    ["Staff", [v.firstName, v.lastName].filter(Boolean).join(" ")],
    ["Employee number", v.employmentNumber],
    ["License number", v.licenseNumber],
    ["work email", v.workEmail],
    ["phone", v.phoneNumber],
    ["Department", v.department],
    ["Employment date", v.employmentDate],
  ].filter(([, val]) => val) as [string, string][];

  return (
    <div className="p-4 text-sm">
    <p className="mb-3 font-medium">Review</p>
    <div className="space-y-1.5 text-muted-foreground">
      {summary.map(([key, val]) => (
        <div key={key} className="flex justify-between gap-4">
          <span>{key}</span>
          <span className="font-medium text-foreground">{val}</span>
        </div>
      ))}
    </div>
  </div>
  )
}
