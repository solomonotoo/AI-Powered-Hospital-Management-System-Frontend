import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UsersToolbarActionsProps {
  onExport: () => void;
  onNewStaff: () => void;
  canCreateStaff?: boolean;
}

export function UsersToolbarActions({
  onExport,
  onNewStaff,
  canCreateStaff = true,
}: UsersToolbarActionsProps) {
  return (
    <div className="flex justify-end flex-wrap items-center gap-2">
      <Button onClick={onExport} size="sm" className="hover:cursor-pointer">
        <Download className="w-4 h-4 mr-4" />
        Export
      </Button>

      <Button onClick={onNewStaff} size="sm" className="hover:cursor-pointer">
        <Plus className="w-4 h-4 mr-4" />
        Add Staff
      </Button>
    </div>
  );
}
