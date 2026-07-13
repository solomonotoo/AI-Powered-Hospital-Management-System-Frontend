//this component is a button action for the toolbar and it button action for refresh,
// export file(csv,excel,pdf) and new visit

import { Button } from "@/components/ui/button";
import { Download, Plus, RefreshCw } from "lucide-react";

interface VisitToolbarActionsProps {
  onRefresh?: () => void;
  onExport?: () => void;
  onNewVisit?: () => void;
  canCreateVisit?: boolean;
}

export function VisitToolbarActions({
  onRefresh,
  onExport,
  onNewVisit,
  canCreateVisit = true,
}: VisitToolbarActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" onClick={onRefresh} >
            <RefreshCw className="mr-2 n-4 w-4" />
            Refresh
        </Button>
        <Button variant="outline" size="sm" onClick={onExport} >
            <Download className="mr-2 n-4 w-4" />
            Export
        </Button>
        
        {canCreateVisit && (
            <Button  size="sm" onClick={onNewVisit} >
            <Plus className="mr-2 n-4 w-4" />
            New Visit
        </Button>
        )}
    </div>
  );
}
