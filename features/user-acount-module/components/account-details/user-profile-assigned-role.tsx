"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Filter,
  Download,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  Lock,
  Unlock,
  Key,
  Settings,
  User,
  Briefcase,
  Star,
  Clock,
  Eye,
  EyeOff,
  FileText,
  Database,
  Cloud,
  Server,
  Network,
  Mail,
  MessageSquare,
  Calendar,
  Gift,
  Award,
  BookOpen,
} from "lucide-react";
import {
  UserPermissionCategories,
  userRoles,
} from "../../user-roles-mock-data";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  checked: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  users: number;
  permissions: string[];
  color: string;
  status: "active" | "inactive";
}

interface UserProfileAssignRoleProps {
  userId?: string;
  onClose?: () => void;
  onAssign?: (roleId: string, permissions: string[]) => void;
}

export function UserProfileAssignRole({
  userId,
  onClose,
  onAssign,
}: UserProfileAssignRoleProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["all"])
  );
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const roles = userRoles;
  const permissionCategories = UserPermissionCategories;
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

  const handleAssignRole = () => {
    setShowConfirmDialog(true);
  };

  const confirmAssign = () => {
    if (selectedRole && selectedPermissions.length > 0) {
      onAssign?.(selectedRole, selectedPermissions);
      setShowConfirmDialog(false);
    }
  };

  const getRolePermissions = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId);
    return role?.permissions || [];
  };

  const getSelectedRoleName = () => {
    const role = roles.find((r) => r.id === selectedRole);
    return role?.name || "";
  };

  // Update permissions when role is selected
  const handleRoleSelect = (value: string) => {
    setSelectedRole(value);
    const role = roles.find((r) => r.id === value);
    if (role?.permissions.includes("all")) {
      // Select all permissions
      const allPerms = permissionCategories.flatMap((cat) =>
        cat.permissions.map((p) => p.id)
      );
      setSelectedPermissions(allPerms);
    } else if (role) {
      // Select permissions based on role
      const rolePerms = permissionCategories.flatMap((cat) =>
        cat.permissions.filter((p) => role.permissions.includes(p.id))
      );
      setSelectedPermissions(rolePerms.map((p) => p.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Assign New Role
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Configure user roles and permissions
          </p>
        </div>
        <div className="flex items-center gap-2">
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
            onClick={handleAssignRole}
            disabled={!selectedRole || selectedPermissions.length === 0}
          >
            <UserPlus className="h-4 w-4" />
            Assign Role
          </Button>
        </div>
      </div>

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
                    filteredRoles.map((role) => (
                      <div
                        key={role.id}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          selectedRole === role.id
                            ? "bg-indigo-50 dark:bg-indigo-950/30 border-2 border-indigo-200 dark:border-indigo-800"
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
                    ))
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
                      <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
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
                                  category.permissions.filter((p) =>
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
                                {category.permissions.every((p) =>
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
                              {category.permissions.map((permission) => (
                                <div
                                  key={permission.id}
                                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
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
                                      className="text-sm font-medium cursor-pointer"
                                    >
                                      {permission.name}
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
                            {category.permissions.every((p) =>
                              selectedPermissions.includes(p.id)
                            )
                              ? "Deselect All"
                              : "Select All"}
                          </Button>
                        </div>
                        {category.permissions.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
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
                                className="text-sm font-medium cursor-pointer"
                              >
                                {permission.name}
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
                      <span className="text-xs text-slate-500">
                        {selectedPermissions.length} selected
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {selectedPermissions.length > 0 ? (
                        selectedPermissions.map((permId) => {
                          const perm = permissionCategories
                            .flatMap((cat) => cat.permissions)
                            .find((p) => p.id === permId);
                          return perm ? (
                            <Badge
                              key={perm.id}
                              variant="secondary"
                              className="text-xs"
                            >
                              {perm.name}
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

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />
              Confirm Role Assignment
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to assign this role with the selected
              permissions?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
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
                Permissions to assign:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selectedPermissions.map((permId) => {
                  const perm = permissionCategories
                    .flatMap((cat) => cat.permissions)
                    .find((p) => p.id === permId);
                  return perm ? (
                    <Badge
                      key={perm.id}
                      variant="secondary"
                      className="text-xs"
                    >
                      {perm.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={confirmAssign}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirm Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
