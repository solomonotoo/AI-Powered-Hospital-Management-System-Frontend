import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

//this is a generic shared data table row actions for each row record
export interface RowAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

//for array of actions buttons
interface DataTableRowActionsProps {
  actions: RowAction[];
}

export function DataTableRowActions({ actions }: DataTableRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-8 w-8 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
        {actions.map((action) => (
          <DropdownMenuItem
            key={action.label}
            onClick={(e) => {
              e.stopPropagation();
              action.onClick();
            }}
          >
            {action.icon && (
              <span className="mr-2 flex items-center">{action.icon}</span>
            )}
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
