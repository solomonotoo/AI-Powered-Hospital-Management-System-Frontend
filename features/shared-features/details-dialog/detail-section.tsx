import { DetailItem as DetailItemType } from "./types";
import { DetailItem } from "./detail-item";
import React from "react";

interface DetailSectionProps {
  title: string;
  icon?: React.ReactNode;
  items: DetailItemType[];
}

export function DetailSection({ title, icon, items }: DetailSectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="flex text-sm font-semibold tracking-wide uppercase text-muted-foreground gap-4">
        {icon} {title}
      </h3>

      <div className="rounded-md border p-4">
        {items.map((item) => (
          <DetailItem key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
}
