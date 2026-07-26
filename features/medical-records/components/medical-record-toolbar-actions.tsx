import { Button } from "@/components/ui/button";
import { Download, Plus, RefreshCw } from "lucide-react";

interface MedicalRecordToolbarActionsProps {
  onRefresh?: () => void;
  onExport?: () => void;
  onNewRecord?: () => void;
  canCreateVisit?: boolean;
}

export function MedicalRecordToolbarActions({
  onRefresh,
  onExport,
  onNewRecord,
  canCreateVisit = true,
}: MedicalRecordToolbarActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="sm" onClick={onRefresh}>
        <RefreshCw className="mr-2 n-4 w-4" />
        Refresh
      </Button>
      <Button variant="outline" size="sm" onClick={onExport}>
        <Download className="mr-2 n-4 w-4" />
        Export
      </Button>

      {canCreateVisit && (
        <Button size="sm" onClick={onNewRecord}>
          <Plus className="mr-2 n-4 w-4" />
          New Visit
        </Button>
      )}
    </div>
  );
}
