import { Badge } from "@/components/ui/badge";
import { KeyRound } from "lucide-react";

interface EffectivePermissionsCardProps {
  permissions: string[];
}

export function EffectivePermissionsCard({
  permissions,
}: EffectivePermissionsCardProps) {
  return (
    <div className="rounded-xl border bg-card">
      <div className="border-b p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
            <KeyRound className="size-5 text-primary" />
          </div>

          <div>
            <h3 className="font-semibold">Effective Permissions</h3>

            <p className="text-sm text-muted-foreground">
              Access automatically granted through active roles
            </p>
          </div>
        </div>
      </div>

      <div className="p-5">
        {permissions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No effective permissions
          </p>
        ) : (
          <>
            <p className="mb-4 text-sm text-muted-foreground">
              {permissions.length} effective permissions
            </p>

            <div className="flex flex-wrap gap-2">
              {permissions.map((permission) => (
                <Badge
                  key={permission}
                  variant="secondary"
                  className="font-normal"
                >
                  {permission}
                </Badge>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
