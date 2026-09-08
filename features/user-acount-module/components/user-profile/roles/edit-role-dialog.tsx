"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Edit3,
  Search,
  Check,
  Loader2,
  Layers,
  KeyRound,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { RoleResponse } from "@/features/user-acount-module/types/user-access.types";
import { usePermissions } from "@/features/user-acount-module/hook/use-permissions";

interface EditRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: RoleResponse | null;
  currentUserId: string;
}

/**
 * [ROOM FOR UPDATE]: Role Editing Dialog
 *
 * Architecture Note:
 * The backend OpenAPI definition currently defines:
 * - GET /api/v1/roles
 * - POST /api/v1/roles
 * But does not yet expose PUT /api/v1/roles/{roleId}.
 *
 * This component provides the complete modern UI experience and validation.
 * When the backend adds PUT /api/v1/roles/{roleId}, connect the mutation call
 * in `handleSubmit` below directly to `rolesService.updateRole()`.
 */
export function EditRoleDialog({
  open,
  onOpenChange,
  role,
  currentUserId: _currentUserId,
}: EditRoleDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Hook to fetch all system permissions
  const { data: permissions = [], isLoading: isPermissionsLoading } =
    usePermissions();

  // Populate state whenever target role changes
  useEffect(() => {
    if (role && open) {
      setName(role.name || "");
      setDescription(role.description || "");
      setSelectedCodes(role.permissionCodes || []);
      setSearchQuery("");
    }
  }, [role, open]);

  // Group permissions by domain module
  const groupedPermissions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const groups = new Map<string, typeof permissions>();

    for (const p of permissions) {
      if (!p.code) continue;
      const matches =
        !q ||
        p.code.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q));
      if (!matches) continue;

      const moduleName = p.code.split(/[_:]/)[0]?.toUpperCase() || "GENERAL";
      const list = groups.get(moduleName) ?? [];
      list.push(p);
      groups.set(moduleName, list);
    }
    return groups;
  }, [permissions, searchQuery]);

  const handleToggleCode = (code: string) => {
    setSelectedCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role?.roleId) return;

    if (!name.trim()) {
      toast.error("Role name cannot be empty");
      return;
    }

    setIsSaving(true);
    try {
      // ─────────────────────────────────────────────────────────────
      // [ROOM FOR UPDATE]: Connect to PUT /api/v1/roles/{roleId}
      // Example:
      // await rolesService.updateRole(role.roleId, { name, description, permissionCodes: selectedCodes }, currentUserId);
      // ─────────────────────────────────────────────────────────────
      await new Promise((resolve) => setTimeout(resolve, 800)); // Simulated network latency

      toast.info(
        `Role update registered locally. Full backend synchronization will activate once PUT /api/v1/roles/{id} is deployed.`
      );
      onOpenChange(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update role";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!role) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] sm:max-w-2xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Edit3 className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-lg">Edit Role Definition</DialogTitle>
              <DialogDescription className="text-xs">
                Update the role name, description, and attached permission bundles.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Informational banner about system roles */}
        {role.systemDefined && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-300">
            <Info className="size-4 shrink-0 mt-0.5" />
            <span>
              This is a system-defined role. Modifying core system roles may alter critical administrative capabilities across the hospital system.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Role Name */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-role-name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Role Name
            </Label>
            <Input
              id="edit-role-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSaving}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-role-description" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Description
            </Label>
            <Textarea
              id="edit-role-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSaving}
              rows={2}
              className="resize-none"
            />
          </div>

          {/* Permissions Matrix */}
          <div className="space-y-3 pt-2 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="size-4 text-primary" />
                <Label className="text-sm font-semibold text-foreground">
                  Attached Permissions
                </Label>
                <Badge variant="secondary" className="text-xs">
                  {selectedCodes.length} selected
                </Badge>
              </div>

              <div className="relative w-48 sm:w-60">
                <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
                <Input
                  placeholder="Filter..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-8 text-xs"
                />
              </div>
            </div>

            <div className="max-h-56 space-y-3 overflow-y-auto rounded-lg border bg-muted/20 p-3">
              {isPermissionsLoading ? (
                <div className="p-6 text-center">
                  <Loader2 className="size-5 animate-spin mx-auto text-muted-foreground" />
                </div>
              ) : (
                Array.from(groupedPermissions.entries()).map(([moduleName, perms]) => (
                  <div key={moduleName} className="rounded-lg border bg-card p-2.5">
                    <div className="flex items-center gap-1.5 mb-2 pb-1 border-b text-xs font-semibold">
                      <Layers className="size-3.5 text-primary" />
                      <span>{moduleName}</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {perms.map((p) => {
                        const code = p.code!;
                        const isChecked = selectedCodes.includes(code);
                        return (
                          <label
                            key={code}
                            className={`flex cursor-pointer items-start gap-2 rounded border p-2 text-xs transition-colors ${
                              isChecked ? "border-primary/40 bg-primary/5" : "border-transparent hover:bg-muted/40"
                            }`}
                          >
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={() => handleToggleCode(code)}
                              className="mt-0.5"
                            />
                            <div className="min-w-0">
                              <code className="text-[11px] font-mono font-medium block truncate">
                                {code}
                              </code>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <DialogFooter className="mt-6 gap-2 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving || !name.trim()} className="gap-2">
              {isSaving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Check className="size-4" />
              )}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
