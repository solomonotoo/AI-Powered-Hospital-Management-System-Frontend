import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UsersToolbarActionsProps {
  onExportCredentials: () => void;
  onNewCredential: () => void;
  canCreateStaff?: boolean;
}

export function UsersToolbarActions({
  onExportCredentials,
  onNewCredential,
  canCreateStaff = true,
}: UsersToolbarActionsProps) {
  return (
    <div className="flex justify-end flex-wrap items-center gap-2">
      <Button onClick={onExportCredentials} size="sm" className="hover:cursor-pointer">
        <Download className="w-4 h-4 mr-4" />
        Export
      </Button>

      <Button onClick={onNewCredential} size="sm" className="hover:cursor-pointer">
        <Plus className="w-4 h-4 mr-4" />
        New Credential
      </Button>
    </div>
  );
}
