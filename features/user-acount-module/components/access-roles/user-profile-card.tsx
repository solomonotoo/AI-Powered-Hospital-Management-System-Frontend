"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Mail,
  Hash,
  Pencil,
  MoreVertical,
  Shield,
  Clock,
  Upload,
  X,
  Loader2,
} from "lucide-react";

import { toast } from "sonner";

import defaultProfilePic from "@/public/images/signup1.jpg";
import { UserSummaryResponse } from "../../types/users";


interface UserProfileCardProps {
  user?: UserSummaryResponse;

  isLoading?: boolean;

  onImageUpload?: (file: File) => Promise<void>;

  onImageRemove?: () => Promise<void>;
}

function formatLastLogin(
  lastLoginAt?: string
): string {
  if (!lastLoginAt) {
    return "Never";
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

function formatStatus(
  status?: string
): string {
  if (!status) {
    return "UNKNOWN";
  }

  return status.replaceAll("_", " ");
}

export function UserProfileCard({
  user,
  isLoading = false,
  onImageUpload,
  onImageRemove,
}: UserProfileCardProps) {
  const [profileImage, setProfileImage] =
    useState<string | null>(null);

  const [isUploading, setIsUploading] =
    useState(false);

  const [isHovering, setIsHovering] =
    useState(false);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!validTypes.includes(file.type)) {
      toast.error(
        "Please upload a valid image file (JPEG, PNG, WebP, or GIF)"
      );

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(
        "Image size must be less than 5MB"
      );

      return;
    }

    setIsUploading(true);

    try {
      if (onImageUpload) {
        await onImageUpload(file);
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setProfileImage(
          reader.result as string
        );

        setIsUploading(false);

        toast.success(
          "Profile photo updated successfully!"
        );
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error(
        "Profile image upload error:",
        error
      );

      setIsUploading(false);

      toast.error(
        "Failed to upload image. Please try again."
      );
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
      console.error(
        "Profile image removal error:",
        error
      );

      toast.error(
        "Failed to remove image. Please try again."
      );
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (isLoading) {
    return (
      <Card className="border-0 shadow-lg">
        <CardHeader className="border-b pb-6">
          <div className="space-y-2">
            <div className="h-7 w-40 animate-pulse rounded bg-muted" />
            <div className="h-4 w-64 animate-pulse rounded bg-muted" />
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="h-32 w-32 animate-pulse rounded-2xl bg-muted md:h-40 md:w-40" />

            <div className="flex-1 space-y-5">
              <div className="h-6 w-48 animate-pulse rounded bg-muted" />
              <div className="h-10 w-full animate-pulse rounded bg-muted" />
              <div className="h-10 w-full animate-pulse rounded bg-muted" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return null;
  }

  const status = formatStatus(user.status);

  const isActive =
    user.status?.toUpperCase() === "ACTIVE";

  return (
    <Card className="border-0 bg-white shadow-lg dark:bg-white">
      <CardHeader className="border-b border-slate-200/60 pb-6 dark:border-slate-200/60">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-900">
              User Account
            </CardTitle>

            <p className="text-sm text-slate-500 dark:text-slate-500">
              Manage user profile and access settings
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="flex flex-col items-start gap-8 md:flex-row">

          {/* Profile photo */}
          <div className="shrink-0">
            <div
              className="group relative h-32 w-32 md:h-40 md:w-40"
              onMouseEnter={() =>
                setIsHovering(true)
              }
              onMouseLeave={() =>
                setIsHovering(false)
              }
            >
              <AspectRatio
                ratio={1}
                className="rounded-2xl bg-white p-1 shadow-xl dark:bg-white"
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl">
                  <Image
                    src={
                      profileImage ??
                      defaultProfilePic
                    }
                    alt={
                      user.fullName ??
                      "User profile photo"
                    }
                    fill
                    className={`object-cover transition-all duration-300 ${isHovering
                        ? "scale-105 brightness-75"
                        : "scale-100"
                      }`}
                  />

                  <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5 dark:ring-black/5" />

                  {isHovering &&
                    !isUploading && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl bg-black/40 backdrop-blur-sm">
                        <Upload className="h-8 w-8 text-white" />

                        <span className="text-xs font-medium text-white">
                          Click to upload
                        </span>
                      </div>
                    )}

                  {isUploading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl bg-black/50 backdrop-blur-sm">
                      <Loader2 className="h-8 w-8 animate-spin text-white" />

                      <span className="text-xs font-medium text-white">
                        Uploading...
                      </span>
                    </div>
                  )}
                </div>
              </AspectRatio>

              {/* Photo actions */}
              <div className="absolute -bottom-1 -right-1 flex gap-1">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 rounded-full border-2 border-white shadow-md transition-transform hover:scale-110 dark:border-white"
                  onClick={triggerFileInput}
                  disabled={isUploading}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>

                {profileImage && (
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-8 w-8 rounded-full border-2 border-white shadow-md transition-transform hover:scale-110 dark:border-white"
                    onClick={handleRemoveImage}
                    disabled={isUploading}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
            </div>
          </div>

          {/* User information */}
          <div className="min-w-0 flex-1 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-900">
                  {user.fullName ??
                    "Unnamed User"}
                </h3>

                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="gap-1.5"
                  >
                    <Shield className="h-3 w-3" />

                    {user.staffRole ??
                      "No role"}
                  </Badge>

                  <Badge
                    variant="outline"
                    className={`gap-1.5 ${isActive
                        ? "border-emerald-200 text-emerald-700 dark:border-emerald-200 dark:text-emerald-700"
                        : "border-amber-200 text-amber-700 dark:border-amber-200 dark:text-amber-700"
                      }`}
                  >
                    <Clock className="h-3 w-3" />

                    {status}
                  </Badge>
                </div>
              </div>

              <Button
                variant="outline"
                className="gap-2 shadow-sm transition-shadow hover:shadow-md"
              >
                <Shield className="h-4 w-4" />
                Edit Access
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

              {/* Email */}
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-50">
                <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-50 dark:text-indigo-600">
                  <Mail className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    Email
                  </p>

                  <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-900">
                    {user.loginEmail ??
                      "Not available"}
                  </p>
                </div>
              </div>

              {/* Staff/User ID */}
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-50">
                <div className="rounded-lg bg-purple-50 p-2 text-purple-600 dark:bg-purple-50 dark:text-purple-600">
                  <Hash className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    User ID
                  </p>

                  <p className="truncate font-mono text-sm font-medium text-slate-900 dark:text-slate-900">
                    {user.staffId ??
                      "Not available"}
                  </p>
                </div>
              </div>
            </div>

            {/* Account metadata */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-slate-600 dark:text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                Last login:
                <span className="font-medium text-slate-800 dark:text-slate-800">
                  {formatLastLogin(
                    user.lastLoginAt
                  )}
                </span>
              </span>

              {user.mustChangePassword && (
                <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />

                  Password change required
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}