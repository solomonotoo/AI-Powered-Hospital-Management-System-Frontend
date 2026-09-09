"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Hash,
  Shield,
  Clock,
  Upload,
  X,
  Loader2,
  Copy,
  Check,
  AlertTriangle,
  User as UserIcon,
  UserCheck,
  UserLock,
} from "lucide-react";
import { toast } from "sonner";
import { UserSummaryResponse } from "../../types/users";
import { useCurrentUser } from "../../hook/use-current-user";
import { SuspendUserDialog } from "../suspend-user-dialog";
import { ReactivateUserDialog } from "../reactivate-user-dialog";

interface ProfileCardProps {
  user?: UserSummaryResponse | null;
  isLoading?: boolean;
  onImageUpload?: (file: File) => Promise<void>;
  onImageRemove?: () => Promise<void>;
}

function formatLastLogin(lastLoginAt?: string): string {
  if (!lastLoginAt) {
    return "Never logged in";
  }

  const date = new Date(lastLoginAt);
  if (Number.isNaN(date.getTime())) {
    return lastLoginAt;
  }

  return new Intl.DateTimeFormat("en-GH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function getStatusBadgeVariant(
  status?: string
): "default" | "secondary" | "destructive" | "outline" {
  switch (status?.toUpperCase()) {
    case "ACTIVE":
      return "default";
    case "SUSPENDED":
    case "INACTIVE":
      return "destructive";
    default:
      return "secondary";
  }
}

export function ProfileCard({
  user,
  isLoading = false,
  onImageUpload,
  onImageRemove,
}: ProfileCardProps) {
  const { user: currentUser } = useCurrentUser();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hasCopiedId, setHasCopiedId] = useState(false);
  const [suspendOpen, setSuspendOpen] = useState(false);
  const [reactivateOpen, setReactivateOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isSuspended = user?.status?.toUpperCase() === "SUSPENDED";

  const handleCopyId = async (id?: string) => {
    if (!id) return;
    try {
      await navigator.clipboard.writeText(id);
      setHasCopiedId(true);
      toast.success("User ID copied to clipboard");
      setTimeout(() => setHasCopiedId(false), 2000);
    } catch {
      toast.error("Failed to copy ID");
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image (JPEG, PNG, WebP, or GIF)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    try {
      if (onImageUpload) {
        await onImageUpload(file);
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setIsUploading(false);
        toast.success("Profile photo updated");
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Profile image upload error:", error);
      setIsUploading(false);
      toast.error("Failed to upload image. Please try again.");
    }
  };

  const handleRemoveImage = async () => {
    try {
      if (onImageRemove) {
        await onImageRemove();
      }
      setProfileImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.info("Profile photo removed");
    } catch (error) {
      console.error("Profile image removal error:", error);
      toast.error("Failed to remove image");
    }
  };

  if (isLoading) {
    return (
      <Card className="border bg-card shadow-sm">
        <CardHeader className="border-b pb-4">
          <div className="space-y-2">
            <div className="h-6 w-36 animate-pulse rounded bg-muted" />
            <div className="h-4 w-60 animate-pulse rounded bg-muted" />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="size-24 animate-pulse rounded-full bg-muted sm:size-28" />
            <div className="flex-1 space-y-3">
              <div className="h-6 w-48 animate-pulse rounded bg-muted" />
              <div className="h-4 w-72 animate-pulse rounded bg-muted" />
              <div className="flex gap-2 pt-1">
                <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
                <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="border border-dashed bg-card p-8 text-center shadow-sm">
        <UserIcon className="mx-auto size-10 text-muted-foreground" />
        <h3 className="mt-2 text-base font-semibold">User profile not found</h3>
        <p className="text-sm text-muted-foreground">
          The requested user account information could not be found.
        </p>
      </Card>
    );
  }

  const initials = user.fullName
    ? user.fullName
        .split(" ")
        .map((part) => part[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  const statusLabel = user.status ? user.status.replace(/_/g, " ") : "UNKNOWN";

  return (
    <Card className="border bg-card shadow-sm">
      <CardContent className="p-6">
        {/* Suspended Alert Banner */}
        {isSuspended && (
          <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-800 dark:text-red-300">
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-600 dark:text-red-400">
                <AlertTriangle className="size-4" />
              </div>
              <div>
                <p className="font-semibold text-red-900 dark:text-red-200">
                  This user account is currently suspended
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  The user cannot sign in or perform clinical operations. Reactivate to restore full access privileges.
                </p>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => setReactivateOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5 shrink-0 self-start sm:self-auto"
            >
              <UserCheck className="size-3.5" />
              <span>Reactivate Now</span>
            </Button>
          </div>
        )}

        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          {/* Avatar / Photo with hover upload */}
          <div
            className="relative shrink-0"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative size-24 overflow-hidden rounded-full border-2 border-border bg-muted shadow-sm sm:size-28">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt={user.fullName || "User Profile"}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-primary/10 text-xl font-bold text-primary sm:text-2xl">
                  {initials}
                </div>
              )}

              {/* Upload overlay */}
              {isHovering && !isUploading && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black/60 text-white transition-opacity"
                >
                  <Upload className="size-4" />
                  <span className="mt-1 text-[10px] font-medium">Change</span>
                </div>
              )}

              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white">
                  <Loader2 className="size-5 animate-spin" />
                </div>
              )}
            </div>

            {profileImage && !isUploading && (
              <button
                type="button"
                onClick={handleRemoveImage}
                title="Remove photo"
                className="absolute -right-1 -top-1 rounded-full border bg-background p-1 text-muted-foreground shadow-sm hover:text-destructive"
              >
                <X className="size-3.5" />
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {/* User Details */}
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  {user.fullName || "Unnamed User"}
                </h1>
                <Badge variant={getStatusBadgeVariant(user.status)}>
                  {statusLabel}
                </Badge>
                {user.staffRole && (
                  <Badge variant="outline" className="gap-1 font-normal">
                    <Shield className="size-3 text-primary" />
                    {user.staffRole}
                  </Badge>
                )}
                {user.mustChangePassword && (
                  <Badge
                    variant="outline"
                    className="gap-1 border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  >
                    <AlertTriangle className="size-3" />
                    Password Reset Required
                  </Badge>
                )}
              </div>

              {/* Account Status Action Button: Reactivate or Suspend */}
              <div className="flex items-center gap-2 shrink-0">
                {isSuspended ? (
                  <Button
                    size="sm"
                    onClick={() => setReactivateOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5 shadow-sm"
                  >
                    <UserCheck className="size-3.5" />
                    <span>Reactivate Account</span>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSuspendOpen(true)}
                    className="border-destructive/30 text-destructive hover:bg-destructive/10 text-xs gap-1.5"
                  >
                    <UserLock className="size-3.5" />
                    <span>Suspend Account</span>
                  </Button>
                )}
              </div>
            </div>

            {/* Sub-info items */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {user.loginEmail && (
                <div className="flex items-center gap-1.5">
                  <Mail className="size-4 shrink-0 text-muted-foreground/80" />
                  <span className="truncate">{user.loginEmail}</span>
                </div>
              )}

              {user.staffId && (
                <div className="flex items-center gap-1.5 font-mono text-xs">
                  <Hash className="size-3.5 shrink-0 text-muted-foreground/80" />
                  <span>{user.staffId}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-5 p-0 hover:bg-muted"
                    onClick={() => handleCopyId(user.staffId)}
                    title="Copy Staff ID"
                  >
                    {hasCopiedId ? (
                      <Check className="size-3 text-emerald-600" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                  </Button>
                </div>
              )}

              <div className="flex items-center gap-1.5">
                <Clock className="size-4 shrink-0 text-muted-foreground/80" />
                <span>Last login: {formatLastLogin(user.lastLoginAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Confirmation Dialogs */}
      <SuspendUserDialog
        open={suspendOpen}
        onOpenChange={setSuspendOpen}
        user={user}
        currentUserId={currentUser?.staffId}
      />

      <ReactivateUserDialog
        open={reactivateOpen}
        onOpenChange={setReactivateOpen}
        user={user}
        currentUserId={currentUser?.staffId}
      />
    </Card>
  );
}
