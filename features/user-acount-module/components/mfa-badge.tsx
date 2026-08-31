import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ShieldOff } from "lucide-react";

interface MFABadgeProps {
  enabled: boolean;
}

export function MFABadge({ enabled }: MFABadgeProps) {
  return (
    <Badge
      variant={enabled ? "default" : "secondary"}
      className="gap-1.5 font-medium"
    >
      {enabled ? (
        <>
          <ShieldCheck className="h-3 w-3" />
          Enabled
        </>
      ) : (
        <>
          <ShieldOff className="h-3 w-3" />
          Disabled
        </>
      )}
    </Badge>
  );
}
