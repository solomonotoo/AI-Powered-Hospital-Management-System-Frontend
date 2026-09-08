"use client";

import { useMemo, useState } from "react";
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
  ShieldPlus,
  Search,
  Check,
  Loader2,
  Layers,
  KeyRound,
  CheckSquare,
  Square,
} from "lucide-react";
import { toast } from "sonner";
import { useCreateRole } from "@/features/user-acount-module/hook/use-create-role";
import { usePermissions } from "@/features/user-acount-module/hook/use-permissions";

interface CreateRoleDialogProps {
  // Controls modal visibility
  open: boolean;
  // Callback when modal open state changes
  onOpenChange: (open: boolean) => void;
  // Authenticated user ID required by the backend OpenAPI query param currentUserId
  currentUserId: string;
}

/**
 * Helper to parse permission codes (e.g., 'USER_READ', 'PATIENT_WRITE') into Module and Action
 */
function parseCode(code: string): { module: string; action: string } {
  const parts = code.split(/[_:]/);
  if (parts.length >= 2) {
    return {
      module: parts[0].toUpperCase(),
      action: parts.slice(1).join(" ").toUpperCase(),
    };
  }
  return { module: "GENERAL", action: code.toUpperCase() };
}

export function CreateRoleDialog({
  open,
  onOpenChange,
  currentUserId,
}: CreateRoleDialogProps) {
  // Form input states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Hook to fetch all registered system permissions
  const { data: permissions = [], isLoading: isPermissionsLoading } =
    usePermissions();

  // Mutation hook backed by POST /api/v1/roles?currentUserId=...
  const { mutate: createRole, isPending } = useCreateRole();

  // Reset form when dialog opens or closes
  const resetForm = () => {
    setName("");
    setDescription("");
    setSelectedCodes([]);
    setSearchQuery("");
  };

  // Group and filter permissions by module category
  const groupedPermissions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const groups = new Map<string, typeof permissions>();

    for (const p of permissions) {
      if (!p.code) continue;

      // Filter by search query across code or description
      const matchesSearch =
        !q ||
        p.code.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q));

      if (!matchesSearch) continue;

      const { module } = parseCode(p.code);
      const list = groups.get(module) ?? [];
      list.push(p);
      groups.set(module, list);
    }

    return groups;
  }, [permissions, searchQuery]);

  // Toggle single permission selection
  const handleToggleCode = (code: string) => {
    setSelectedCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  // Select or deselect all permissions in a specific module group
  const handleToggleModule = (moduleCodes: string[]) => {
    const allSelected = moduleCodes.every((c) => selectedCodes.includes(c));
    if (allSelected) {
      // Remove all codes of this module
      setSelectedCodes((prev) => prev.filter((c) => !moduleCodes.includes(c)));
    } else {
      // Add missing codes of this module
      const unique = Array.from(new Set([...selectedCodes, ...moduleCodes]));
      setSelectedCodes(unique);
    }
  };

  // Submission handler mapping strictly to OpenAPI CreateRoleRequest
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validation: Name is required
    const trimmedName = name.trim();
    if (!trimmedName) {
      toast.error("Please provide a name for the role");
      return;
    }

    // 2. Validation: Ensure at least one permission is assigned
    if (selectedCodes.length === 0) {
      toast.error("Please select at least one permission for this role");
      return;
    }

    // 3. Execute OpenAPI createRole mutation
    createRole(
      {
        currentUserId,
        data: {
          name: trimmedName,
          description: description.trim() || undefined,
          permissionCodes: selectedCodes,
        },
      },
      {
        onSuccess: (newRole) => {
          toast.success(
            `Role "${newRole.name || trimmedName}" created successfully!`
          );
          resetForm();
          onOpenChange(false);
        },
        onError: (err) => {
          const message =
            err instanceof Error ? err.message : "Failed to create role";
          toast.error(message);
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) resetForm();
        onOpenChange(isOpen);
      }}
    >
      <DialogContent className="max-h-[92vh] sm:max-w-2xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShieldPlus className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-lg">Create New Role</DialogTitle>
              <DialogDescription className="text-xs">
                Define a new access role and configure its bundled operational permissions.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          {/* Role Name */}
          <div className="space-y-1.5">
            <Label htmlFor="role-name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Role Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="role-name"
              placeholder="e.g., CLINICAL_SUPERVISOR, BILLING_CLERK"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isPending}
              required
              className="h-10"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="role-description" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Description <span className="text-muted-foreground text-[11px] font-normal">(Optional)</span>
            </Label>
            <Textarea
              id="role-description"
              placeholder="Describe the operational responsibilities and clinical scope of this role..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isPending}
              rows={2}
              className="resize-none text-sm"
            />
          </div>

          {/* Permissions Selection Header */}
          <div className="space-y-3 pt-2 border-t">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="size-4 text-primary" />
                <Label className="text-sm font-semibold text-foreground">
                  Bundle Permissions
                </Label>
                <Badge variant="secondary" className="text-xs font-semibold">
                  {selectedCodes.length} selected
                </Badge>
              </div>

              {/* Permissions Search Filter */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
                <Input
                  placeholder="Filter permissions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-8 text-xs"
                />
              </div>
            </div>

            {/* Permissions Grouped Matrix */}
            <div className="max-h-64 space-y-3 overflow-y-auto rounded-lg border bg-muted/20 p-3">
              {isPermissionsLoading && (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="size-6 animate-spin text-muted-foreground" />
                </div>
              )}

              {!isPermissionsLoading && groupedPermissions.size === 0 && (
                <div className="p-8 text-center text-xs text-muted-foreground">
                  No permissions matching &quot;{searchQuery}&quot;
                </div>
              )}

              {!isPermissionsLoading &&
                Array.from(groupedPermissions.entries()).map(
                  ([moduleName, perms]) => {
                    const moduleCodes = perms
                      .map((p) => p.code)
                      .filter(Boolean) as string[];
                    const allInModuleSelected =
                      moduleCodes.length > 0 &&
                      moduleCodes.every((c) => selectedCodes.includes(c));

                    return (
                      <div
                        key={moduleName}
                        className="rounded-lg border bg-card p-3 shadow-2xs"
                      >
                        {/* Module Subheader with Select All Toggle */}
                        <div className="flex items-center justify-between pb-2 mb-2 border-b">
                          <div className="flex items-center gap-1.5">
                            <Layers className="size-3.5 text-primary" />
                            <span className="font-semibold text-xs text-foreground tracking-wide">
                              {moduleName}
                            </span>
                            <span className="text-[11px] text-muted-foreground">
                              ({moduleCodes.length})
                            </span>
                          </div>

                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleModule(moduleCodes)}
                            className="h-6 px-2 text-[11px] text-primary hover:text-primary gap-1"
                          >
                            {allInModuleSelected ? (
                              <>
                                <Square className="size-3" /> Deselect All
                              </>
                            ) : (
                              <>
                                <CheckSquare className="size-3" /> Select All
                              </>
                            )}
                          </Button>
                        </div>

                        {/* Module Permissions Checkbox Grid */}
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {perms.map((perm) => {
                            const code = perm.code!;
                            const isChecked = selectedCodes.includes(code);
                            const { action } = parseCode(code);

                            return (
                              <label
                                key={code}
                                className={`flex cursor-pointer items-start gap-2.5 rounded-md border p-2 text-xs transition-colors ${
                                  isChecked
                                    ? "border-primary/50 bg-primary/5"
                                    : "border-transparent hover:bg-muted/50"
                                }`}
                              >
                                <Checkbox
                                  checked={isChecked}
                                  onCheckedChange={() =>
                                    handleToggleCode(code)
                                  }
                                  className="mt-0.5"
                                />
                                <div className="min-w-0 space-y-0.5">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="font-medium text-foreground">
                                      {action}
                                    </span>
                                  </div>
                                  <code className="text-[10px] text-muted-foreground font-mono block truncate">
                                    {code}
                                  </code>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          </div>

          <DialogFooter className="mt-6 gap-2 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || !name.trim() || selectedCodes.length === 0}
              className="gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creating Role...
                </>
              ) : (
                <>
                  <Check className="size-4" />
                  Create Role
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
