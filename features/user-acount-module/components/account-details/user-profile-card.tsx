"use client";

import { useState, useRef } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
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

interface UserProfileCardProps {
  userData?: {
    name: string;
    email: string;
    userId: string;
    role: string;
    status: string;
    lastActive: string;
    memberSince: string;
  };
  onImageUpload?: (file: File) => Promise<void>;
  onImageRemove?: () => Promise<void>;
}

export function UserProfileCard({
  userData = {
    name: "Peter Owusu",
    email: "peterowusu@gmail.com",
    userId: "USR-0023",
    role: "Admin",
    status: "Active",
    lastActive: "2 hours ago",
    memberSince: "Jan 2024",
  },
  onImageUpload,
  onImageRemove,
}: UserProfileCardProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG, WebP, or GIF)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      // If custom upload handler is provided, use it
      if (onImageUpload) {
        await onImageUpload(file);
        // Read file as data URL for preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(reader.result as string);
          setIsUploading(false);
          toast.success("Profile photo updated successfully!");
        };
        reader.readAsDataURL(file);
      } else {
        // Fallback: Simulate upload to server
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(reader.result as string);
          setIsUploading(false);
          toast.success("Profile photo updated successfully!");
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      setIsUploading(false);
      toast.error("Failed to upload image. Please try again.");
      console.error("Upload error:", error);
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
      toast.error("Failed to remove image. Please try again.");
      console.error("Remove error:", error);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <CardHeader className="border-b border-slate-200/60 dark:border-slate-700/60 pb-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
              User Accounts
            </CardTitle>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage user profile and access settings
            </p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Profile Image Section with Upload */}
          <div className="flex-shrink-0">
            <div
              className="relative w-32 h-32 md:w-40 md:h-40 group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <AspectRatio
                ratio={1 / 1}
                className="rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 p-1 shadow-xl"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src={profileImage || defaultProfilePic}
                    alt="Profile photo"
                    fill
                    className={`object-cover transition-all duration-300 ${
                      isHovering ? "scale-105 brightness-75" : "scale-100"
                    }`}
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5 dark:ring-white/10" />

                  {/* Upload Overlay */}
                  {isHovering && !isUploading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 rounded-2xl backdrop-blur-sm transition-all duration-300">
                      <Upload className="h-8 w-8 text-white" />
                      <span className="text-xs text-white font-medium">
                        Click to upload
                      </span>
                    </div>
                  )}

                  {/* Uploading State */}
                  {isUploading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 rounded-2xl backdrop-blur-sm">
                      <Loader2 className="h-8 w-8 text-white animate-spin" />
                      <span className="text-xs text-white font-medium">
                        Uploading...
                      </span>
                    </div>
                  )}
                </div>
              </AspectRatio>

              {/* Edit Button with Dropdown Actions */}
              <div className="absolute -bottom-1 -right-1 flex gap-1">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 rounded-full shadow-md border-2 border-white dark:border-slate-900 hover:scale-110 transition-transform"
                  onClick={triggerFileInput}
                  disabled={isUploading}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                {profileImage && (
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-8 w-8 rounded-full shadow-md border-2 border-white dark:border-slate-900 hover:scale-110 transition-transform"
                    onClick={handleRemoveImage}
                    disabled={isUploading}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>

              {/* Hidden File Input */}
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

          {/* User Info Section */}
          <div className="flex-1 min-w-0 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {userData.name}
                </h3>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <Badge variant="secondary" className="gap-1.5">
                    <Shield className="h-3 w-3" />
                    {userData.role}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`gap-1.5 ${
                      userData.status === "Active"
                        ? "border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400"
                        : "border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-400"
                    }`}
                  >
                    <Clock className="h-3 w-3" />
                    {userData.status}
                  </Badge>
                </div>
              </div>
              <Button
                variant="outline"
                className="gap-2 shadow-sm hover:shadow-md transition-shadow"
              >
                <Shield className="h-4 w-4" />
                Edit Access
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Email
                  </p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {userData.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
                  <Hash className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    User ID
                  </p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white font-mono">
                    {userData.userId}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Last active: {userData.lastActive}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Member since: {userData.memberSince}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
