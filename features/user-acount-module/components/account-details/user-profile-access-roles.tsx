"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Users,
  UserPlus,
  UserMinus,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  PenSquare,
  Key,
} from "lucide-react";
import {
  userRoles,
  UserPermissionCategories,
} from "../../user-roles-mock-data";
import { UserProfileEditRole } from "./user-profilep-edit-role";
import { useRouter } from "next/navigation";

interface UserProfileAccessRolesProps {
  userId?: string;
}

export function UserProfileAccessRoles({
  userId,
}: UserProfileAccessRolesProps) {
  const [showEditRole, setShowEditRole] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const router = useRouter();
  // Mock data - replace with actual data from your backend
  const [userRolesData, setUserRolesData] = useState([
    {
      id: 1,
      name: "Doctor",
      assigned: true,
      permissions: ["Read", "Write", "Delete"],
      assignedAt: "Jan 15, 2026",
    },
    {
      id: 2,
      name: "Nurse",
      assigned: false,
      permissions: ["Read", "Write"],
      assignedAt: "-",
    },
    {
      id: 3,
      name: "Admin",
      assigned: false,
      permissions: ["Read", "Write", "Delete", "Manage Users"],
      assignedAt: "-",
    },
    {
      id: 4,
      name: "Receptionist",
      assigned: false,
      permissions: ["Read"],
      assignedAt: "-",
    },
  ]);

  // Mock current user role and permissions
  const currentUserRole = {
    id: "doctor",
    name: "Doctor",
    description: "Medical professional with patient access",
    permissions: ["read", "write", "delete"],
    color: "bg-blue-500",
    assignedAt: "Jan 15, 2026",
    status: "active" as const,
  };

  const currentPermissions = ["read", "write", "delete"];

  const accessLogs = [
    {
      action: "Access Granted",
      resource: "Patient Records",
      timestamp: "Today, 10:30 AM",
      status: "success",
    },
    {
      action: "Access Denied",
      resource: "Financial Reports",
      timestamp: "Today, 09:15 AM",
      status: "failed",
    },
    {
      action: "Role Updated",
      resource: "Doctor",
      timestamp: "Yesterday, 04:20 PM",
      status: "success",
    },
  ];

  const handleEditRole = (roleId: number) => {
    setEditingRoleId(roleId.toString());
    setShowEditRole(true);
  };

  const handleSaveRole = (roleId: string, permissions: string[]) => {
    // Update the user's role and permissions
    console.log("Saving role:", roleId, permissions);
    // API call to update user role
    setShowEditRole(false);
    setEditingRoleId(null);
  };

  const handleRemoveRole = () => {
    // Remove the user's role
    console.log("Removing role");
    // API call to remove user role
    setShowEditRole(false);
    setEditingRoleId(null);
  };

  if (showEditRole) {
    return (
      <UserProfileEditRole
        userId={userId}
        currentRoleId={currentUserRole.id}
        currentPermissions={currentPermissions}
        onClose={() => {
          setShowEditRole(false);
          setEditingRoleId(null);
        }}
        onSave={handleSaveRole}
        onRemove={handleRemoveRole}
        roles={userRoles}
        permissionCategories={UserPermissionCategories}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Access & Roles
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage user permissions and role assignments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="gap-1.5 shadow-sm hover:shadow-md transition-all"
            onClick={() => handleEditRole(1)}
          >
            <PenSquare className="h-4 w-4" />
            Edit Current Role
          </Button>
          <Button
            className="gap-1.5 shadow-sm hover:shadow-md transition-all"
            onClick={() => {
              setEditingRoleId(null);
              setShowEditRole(true);
            }}
          >
            <UserPlus className="h-4 w-4" />
            Assign New Role
          </Button>
        </div>
      </div>

      {/* Current Role Card */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-slate-900">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-500 text-white">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {currentUserRole.name}
                  </h4>
                  <Badge
                    variant="outline"
                    className="border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {currentUserRole.description}
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Assigned: {currentUserRole.assignedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Key className="h-3 w-3" />
                    {currentPermissions.length} permissions
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 shadow-sm hover:shadow-md transition-all"
              onClick={() => handleEditRole(1)}
            >
              <Edit className="h-3.5 w-3.5" />
              Edit Role
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Roles */}
      <Card className="border-0 shadow-sm bg-slate-50 dark:bg-slate-800/50">
        <CardContent className="p-5">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
            Assigned Roles
          </h4>
          <div className="space-y-3">
            {userRolesData.map((role) => (
              <div
                key={role.id}
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  role.assigned
                    ? "bg-white dark:bg-slate-800/50 shadow-sm border-2 border-emerald-200 dark:border-emerald-800"
                    : "bg-white/50 dark:bg-slate-800/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      role.assigned
                        ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400"
                        : "bg-slate-100 dark:bg-slate-700/50 text-slate-400"
                    }`}
                  >
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2">
                      {role.name}
                      {role.assigned && (
                        <>
                          <Badge
                            variant="outline"
                            className="border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400 text-xs"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                          <Badge
                            variant="outline"
                            className="border-slate-300 text-slate-500 text-xs"
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            {role.assignedAt}
                          </Badge>
                        </>
                      )}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {role.permissions.map((perm) => (
                        <Badge key={perm} variant="outline" className="text-xs">
                          {perm}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                {role.assigned ? (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                      onClick={() => handleEditRole(role.id)}
                    >
                      <Edit className="h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                    >
                      <UserMinus className="h-3.5 w-3.5" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <UserPlus className="h-3.5 w-3.5" />
                    Assign
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Access Logs */}
      <Card className="border-0 shadow-sm bg-slate-50 dark:bg-slate-800/50">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
              Recent Access Logs
            </h4>
            <Button variant="ghost" size="sm" className="text-xs">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {accessLogs.map((log, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white dark:bg-slate-800/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-full ${
                      log.status === "success"
                        ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
                        : "bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400"
                    }`}
                  >
                    {log.status === "success" ? (
                      <CheckCircle className="h-3.5 w-3.5" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {log.action}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {log.resource}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="h-3 w-3 inline mr-1" />
                  {log.timestamp}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
