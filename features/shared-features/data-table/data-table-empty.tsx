import { ReactNode } from "react";
import { File } from "lucide-react";
import { EmptyState } from "../empty-state";

interface DataTableEmptyProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export function DataTableEmpty({
  title,
  description,
  icon,
}: DataTableEmptyProps) {
  return <EmptyState title={title} description={description} icon={File} />;
}
