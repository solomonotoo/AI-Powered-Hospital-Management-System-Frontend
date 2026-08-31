"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Users,
  UserPlus,
  UserMinus,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  ChevronDown,
  ChevronRight,
  Key,
  Clock,
  Save,
  RefreshCw,
  Trash2,
  Mail,
  Calendar,
  FileText,
  Database,
} from "lucide-react";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  checked: boolean;
}

interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  color: string;
  assignedAt: string;
  status: "active" | "inactive";
}

interface UserProfileEditRoleProps {
  userId?: string;
  currentRoleId?: string;
  currentPermissions?: string[];
  onClose?: () => void;
  onSave?: (roleId: string, permissions: string[]) => void;
  onRemove?: () => void;
  roles: UserRole[];
  permissionCategories: any[];
}

export function UserProfileEditRole({
  userId,
  currentRoleId,
  currentPermissions = [],
  onClose,
  onSave,
  onRemove,
  roles,
  permissionCategories,
}: UserProfileEditRoleProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>(currentRoleId || "");
  const [selectedPermissions, setSelectedPermissions] =
    useState<string[]>(currentPermissions);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["all"])
  );
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  // Track changes
  useEffect(() => {
    const roleChanged = selectedRole !== currentRoleId;
    const permsChanged =
      selectedPermissions.length !== currentPermissions.length ||
      selectedPermissions.some((p) => !currentPermissions.includes(p)) ||
      currentPermissions.some((p) => !selectedPermissions.includes(p));
    setIsChanged(roleChanged || permsChanged);
  }, [selectedRole, selectedPermissions, currentRoleId, currentPermissions]);

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const toggleAllPermissions = (categoryPermissions: Permission[]) => {
    const allChecked = categoryPermissions.every((p) =>
      selectedPermissions.includes(p.id)
    );
    if (allChecked) {
      setSelectedPermissions((prev) =>
        prev.filter((id) => !categoryPermissions.some((p) => p.id === id))
      );
    } else {
      setSelectedPermissions((prev) => [
        ...prev,
        ...categoryPermissions
          .filter((p) => !prev.includes(p.id))
          .map((p) => p.id),
      ]);
    }
  };

  const handleRoleSelect = (value: string) => {
    setSelectedRole(value);
    const role = roles.find((r) => r.id === value);
    if (role?.permissions.includes("all")) {
      const allPerms = permissionCategories.flatMap((cat) =>
        cat.permissions.map((p: any) => p.id)
      );
      setSelectedPermissions(allPerms);
    } else if (role) {
      const rolePerms = permissionCategories.flatMap((cat) =>
        cat.permissions.filter((p: any) => role.permissions.includes(p.id))
      );
      setSelectedPermissions(rolePerms.map((p: any) => p.id));
    }
  };

  const handleSave = () => {
    setShowConfirmDialog(true);
  };

  const confirmSave = () => {
    if (selectedRole && selectedPermissions.length > 0) {
      onSave?.(selectedRole, selectedPermissions);
      setShowConfirmDialog(false);
    }
  };

  const handleRemove = () => {
    setShowRemoveDialog(true);
  };

  const confirmRemove = () => {
    onRemove?.();
    setShowRemoveDialog(false);
  };

  const getSelectedRoleName = () => {
    const role = roles.find((r) => r.id === selectedRole);
    return role?.name || "";
  };

  const getSelectedRoleColor = () => {
    const role = roles.find((r) => r.id === selectedRole);
    return role?.color || "";
  };

  const currentRole = roles.find((r) => r.id === currentRoleId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Edit Role & Permissions
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Modify user role assignments and permissions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 shadow-sm hover:shadow-md transition-all text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
            onClick={handleRemove}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Remove Role
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 shadow-sm hover:shadow-md transition-all"
            onClick={onClose}
          >
            <XCircle className="h-3.5 w-3.5" />
            Cancel
          </Button>
          <Button
            className="gap-1.5 shadow-sm hover:shadow-md transition-all"
            onClick={handleSave}
            disabled={
              !isChanged || !selectedRole || selectedPermissions.length === 0
            }
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Current Role Info */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-slate-900">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-2xl ${
                  getSelectedRoleColor() || "bg-indigo-500"
                } text-white`}
              >
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {currentRole?.name || "No Role Assigned"}
                  </h4>
                  {currentRole && (
                    <Badge
                      variant="outline"
                      className="border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Current
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {currentRole?.description || "User has no role assigned"}
                </p>
                {currentRole && (
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Assigned: {currentRole.assignedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Key className="h-3 w-3" />
                      {currentRole.permissions.includes("all")
                        ? "All"
                        : currentRole.permissions.length}{" "}
                      permissions
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {currentRole && (
                <Badge className="gap-1.5 bg-indigo-500 text-white">
                  <RefreshCw className="h-3 w-3" />
                  Editing
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Role Selection */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Available Roles
                  </h4>
                  <Badge variant="secondary" className="text-xs">
                    {roles.filter((r) => r.status === "active").length} Active
                  </Badge>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search roles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 h-9 text-sm"
                  />
                </div>

                {/* Role List */}
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                  {filteredRoles.length > 0 ? (
                    filteredRoles.map((role) => {
                      const isCurrent = role.id === currentRoleId;
                      return (
                        <div
                          key={role.id}
                          className={`p-3 rounded-lg cursor-pointer transition-all ${
                            selectedRole === role.id
                              ? "bg-indigo-50 dark:bg-indigo-950/30 border-2 border-indigo-200 dark:border-indigo-800"
                              : isCurrent
                              ? "bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-800"
                              : "hover:bg-slate-50 dark:hover:bg-slate-800/50 border-2 border-transparent"
                          }`}
                          onClick={() => handleRoleSelect(role.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div
                                className={`p-2 rounded-lg ${role.color} text-white`}
                              >
                                <Shield className="h-4 w-4" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                                    {role.name}
                                  </p>
                                  {isCurrent && (
                                    <Badge
                                      variant="outline"
                                      className="border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400 text-xs"
                                    >
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Current
                                    </Badge>
                                  )}
                                  {role.status === "inactive" && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs border-slate-300 text-slate-500"
                                    >
                                      Inactive
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                  {role.description}
                                </p>
                                <div className="flex items-center gap-3 mt-1.5">
                                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    {role.users} users
                                  </span>
                                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                    <Key className="h-3 w-3" />
                                    {role.permissions.includes("all")
                                      ? "All"
                                      : role.permissions.length}{" "}
                                    permissions
                                  </span>
                                </div>
                              </div>
                            </div>
                            {selectedRole === role.id && (
                              <CheckCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <AlertCircle className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-500">
                        No roles found matching your search
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Permissions */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-5">
              {selectedRole ? (
                <div className="space-y-4">
                  {/* Selected Role Info */}
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${getSelectedRoleColor()} text-white`}
                      >
                        <Shield className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {getSelectedRoleName()}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Select permissions for this role
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="gap-1.5">
                        <CheckCircle className="h-3 w-3 text-emerald-500" />
                        {selectedPermissions.length} permissions selected
                      </Badge>
                      {selectedRole === currentRoleId && (
                        <Badge className="gap-1.5 bg-emerald-500 text-white">
                          <RefreshCw className="h-3 w-3" />
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Permissions Tabs */}
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="w-full justify-start bg-slate-100 dark:bg-slate-800/50 p-1">
                      <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800"
                      >
                        All Permissions
                      </TabsTrigger>
                      {permissionCategories.map((cat) => (
                        <TabsTrigger
                          key={cat.id}
                          value={cat.id}
                          className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800"
                        >
                          {cat.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    <TabsContent value="all" className="mt-4 space-y-4">
                      {permissionCategories.map((category) => (
                        <div
                          key={category.id}
                          className="border rounded-lg overflow-hidden"
                        >
                          <div
                            className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                            onClick={() => toggleCategory(category.id)}
                          >
                            <div className="flex items-center gap-3">
                              <category.icon className="h-4 w-4 text-slate-500" />
                              <span className="text-sm font-medium text-slate-900 dark:text-white">
                                {category.name}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {
                                  category.permissions.filter((p: any) =>
                                    selectedPermissions.includes(p.id)
                                  ).length
                                }
                                /{category.permissions.length}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleAllPermissions(category.permissions);
                                }}
                              >
                                {category.permissions.every((p: any) =>
                                  selectedPermissions.includes(p.id)
                                )
                                  ? "Deselect All"
                                  : "Select All"}
                              </Button>
                              {expandedCategories.has(category.id) ? (
                                <ChevronDown className="h-4 w-4 text-slate-400" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-slate-400" />
                              )}
                            </div>
                          </div>

                          {expandedCategories.has(category.id) && (
                            <div className="p-3 space-y-2">
                              {category.permissions.map((permission: any) => (
                                <div
                                  key={permission.id}
                                  className={`flex items-start gap-3 p-2 rounded-lg transition-colors ${
                                    currentPermissions.includes(
                                      permission.id
                                    ) && selectedRole === currentRoleId
                                      ? "bg-emerald-50 dark:bg-emerald-950/20"
                                      : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                  }`}
                                >
                                  <Checkbox
                                    id={permission.id}
                                    checked={selectedPermissions.includes(
                                      permission.id
                                    )}
                                    onCheckedChange={() =>
                                      togglePermission(permission.id)
                                    }
                                    className="mt-0.5"
                                  />
                                  <div className="flex-1">
                                    <Label
                                      htmlFor={permission.id}
                                      className="text-sm font-medium cursor-pointer flex items-center gap-2"
                                    >
                                      {permission.name}
                                      {currentPermissions.includes(
                                        permission.id
                                      ) &&
                                        selectedRole === currentRoleId && (
                                          <Badge
                                            variant="outline"
                                            className="text-xs border-emerald-200 text-emerald-700"
                                          >
                                            Current
                                          </Badge>
                                        )}
                                    </Label>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                      {permission.description}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </TabsContent>

                    {permissionCategories.map((category) => (
                      <TabsContent
                        key={category.id}
                        value={category.id}
                        className="mt-4 space-y-2"
                      >
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                          <span className="text-sm text-slate-600 dark:text-slate-300">
                            {category.name} Permissions
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={() =>
                              toggleAllPermissions(category.permissions)
                            }
                          >
                            {category.permissions.every((p: any) =>
                              selectedPermissions.includes(p.id)
                            )
                              ? "Deselect All"
                              : "Select All"}
                          </Button>
                        </div>
                        {category.permissions.map((permission: any) => (
                          <div
                            key={permission.id}
                            className={`flex items-start gap-3 p-2 rounded-lg transition-colors ${
                              currentPermissions.includes(permission.id) &&
                              selectedRole === currentRoleId
                                ? "bg-emerald-50 dark:bg-emerald-950/20"
                                : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                            }`}
                          >
                            <Checkbox
                              id={`${category.id}-${permission.id}`}
                              checked={selectedPermissions.includes(
                                permission.id
                              )}
                              onCheckedChange={() =>
                                togglePermission(permission.id)
                              }
                              className="mt-0.5"
                            />
                            <div className="flex-1">
                              <Label
                                htmlFor={`${category.id}-${permission.id}`}
                                className="text-sm font-medium cursor-pointer flex items-center gap-2"
                              >
                                {permission.name}
                                {currentPermissions.includes(permission.id) &&
                                  selectedRole === currentRoleId && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs border-emerald-200 text-emerald-700"
                                    >
                                      Current
                                    </Badge>
                                  )}
                              </Label>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {permission.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </TabsContent>
                    ))}
                  </Tabs>

                  {/* Selected Permissions Summary */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        Selected Permissions
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500">
                          {selectedPermissions.length} selected
                        </span>
                        {isChanged && (
                          <Badge className="gap-1.5 bg-amber-500 text-white text-xs">
                            <AlertCircle className="h-3 w-3" />
                            Unsaved Changes
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {selectedPermissions.length > 0 ? (
                        selectedPermissions.map((permId) => {
                          const perm = permissionCategories
                            .flatMap((cat) => cat.permissions)
                            .find((p: any) => p.id === permId);
                          const isCurrent =
                            currentPermissions.includes(permId) &&
                            selectedRole === currentRoleId;
                          return perm ? (
                            <Badge
                              key={perm.id}
                              variant="secondary"
                              className={`text-xs ${
                                isCurrent
                                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                                  : ""
                              }`}
                            >
                              {perm.name}
                              {isCurrent && (
                                <CheckCircle className="h-3 w-3 ml-1 text-emerald-500" />
                              )}
                            </Badge>
                          ) : null;
                        })
                      ) : (
                        <span className="text-xs text-slate-400">
                          No permissions selected
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mx-auto w-fit mb-4">
                    <Shield className="h-12 w-12 text-slate-400" />
                  </div>
                  <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                    Select a Role
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Choose a role from the left panel to configure its
                    permissions. You can customize which permissions are
                    assigned to this role.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Save Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Save className="h-5 w-5 text-indigo-600" />
              Save Changes
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to save these changes to the user's role and
              permissions?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${getSelectedRoleColor()} text-white`}
                >
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {getSelectedRoleName()}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedPermissions.length} permissions will be assigned
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Changes to be applied:
              </p>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 list-disc list-inside">
                {selectedRole !== currentRoleId && (
                  <li>
                    Role will change from "{currentRole?.name}" to "
                    {getSelectedRoleName()}"
                  </li>
                )}
                <li>
                  {selectedPermissions.length} permissions will be assigned
                </li>
              </ul>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={confirmSave}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Confirmation Dialog */}
      <Dialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              Remove Role
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this role from the user? This
              action can be reversed by assigning a new role.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {currentRole?.name || "Unknown Role"}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    This will remove all permissions associated with this role
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowRemoveDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmRemove}>
              <Trash2 className="h-4 w-4 mr-2" />
              Remove Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
