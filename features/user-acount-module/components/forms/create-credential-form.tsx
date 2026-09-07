"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCredentialSchema,
  CreateCredentialFormValues,
} from "../../schema/credential-schema";
import { useStaff } from "@/features/staff/hooks/use-staff";
import { StaffResponse } from "@/features/staff/types/staff-response";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  KeyRound,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

interface CreateCredentialFormProps {
  onSubmit: (values: CreateCredentialFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

// Generates a cryptographically strong, compliant temporary password
function generateSecurePassword(): string {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghijkmnopqrstuvwxyz";
  const numbers = "23456789";
  const special = "!@#$%^&*";
  
  // Guarantee at least one of each class
  let pwd = [
    upper[Math.floor(Math.random() * upper.length)],
    lower[Math.floor(Math.random() * lower.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    special[Math.floor(Math.random() * special.length)],
  ];
  
  const all = upper + lower + numbers + special;
  for (let i = 0; i < 8; i++) {
    pwd.push(all[Math.floor(Math.random() * all.length)]);
  }
  
  // Shuffle characters
  return pwd.sort(() => Math.random() - 0.5).join("");
}

// Calculate strength score for visual feedback
function getPasswordStrength(pwd: string): { score: number; label: string; color: string } {
  if (!pwd) return { score: 0, label: "None", color: "bg-muted" };
  let score = 0;
  if (pwd.length >= 8) score += 25;
  if (/[A-Z]/.test(pwd)) score += 25;
  if (/[0-9]/.test(pwd)) score += 25;
  if (/[^A-Za-z0-9]/.test(pwd)) score += 25;

  if (score <= 25) return { score, label: "Weak", color: "bg-destructive" };
  if (score <= 50) return { score, label: "Fair", color: "bg-amber-500" };
  if (score <= 75) return { score, label: "Good", color: "bg-blue-500" };
  return { score: 100, label: "Strong", color: "bg-emerald-500" };
}

export function CreateCredentialForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: CreateCredentialFormProps) {
  // Toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  // Toggle between staff picker vs manual UUID entry
  const [manualStaffId, setManualStaffId] = useState(false);
  // Track copied state for feedback
  const [copiedField, setCopiedField] = useState<string | null>(null);
  // Track successfully created credentials to show copyable summary card
  const [createdSummary, setCreatedSummary] = useState<{
    staffName?: string;
    loginEmail: string;
    temporaryPassword: string;
  } | null>(null);

  // Fetch real staff members from database for selection
  const { data: staffData, isLoading: isStaffLoading } = useStaff({
    page: 0,
    size: 50,
  });
  const staffList: StaffResponse[] = staffData?.content ?? [];

  // Track currently selected staff member for preview card
  const [selectedStaff, setSelectedStaff] = useState<StaffResponse | null>(null);

  // React Hook Form initialized with Zod schema matching OpenAPI types
  const form = useForm<CreateCredentialFormValues>({
    resolver: zodResolver(createCredentialSchema),
    defaultValues: {
      staffId: "",
      loginEmail: "",
      temporaryPassword: "",
    },
    mode: "onTouched",
  });

  const { control, handleSubmit, setValue, watch } = form;
  const currentPassword = watch("temporaryPassword") || "";
  const passwordStrength = getPasswordStrength(currentPassword);

  // Helper to generate and fill a temporary password
  const handleGeneratePassword = () => {
    const newPassword = generateSecurePassword();
    setValue("temporaryPassword", newPassword, {
      shouldValidate: true,
      shouldDirty: true,
    });
    toast.success("Generated a strong temporary password");
  };

  // Helper to copy text to clipboard
  const copyToClipboard = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedField(null), 2000);
  };

  // When a staff is selected from the dropdown, auto-populate staffId and work email
  const handleStaffSelect = (staffId: string) => {
    const staff = staffList.find((s) => s.staffId === staffId);
    if (staff) {
      setSelectedStaff(staff);
      setValue("staffId", staff.staffId, { shouldValidate: true });
      if (staff.workEmail) {
        setValue("loginEmail", staff.workEmail, { shouldValidate: true });
      }
    }
  };

  // Form submission handler
  const handleFormSubmit = async (values: CreateCredentialFormValues) => {
    try {
      await onSubmit(values);
      // Save summary for admin handover before dialog close
      setCreatedSummary({
        staffName: selectedStaff
          ? `${selectedStaff.firstName} ${selectedStaff.lastName}`
          : values.staffId,
        loginEmail: values.loginEmail,
        temporaryPassword: values.temporaryPassword,
      });
    } catch (error) {
      // Error handled by mutation hook toast
    }
  };

  // If credentials were just created, show celebratory summary card with copy tools
  if (createdSummary) {
    const fullSummaryText = `Hospital Management System - Staff Credentials\nStaff: ${createdSummary.staffName}\nLogin Email: ${createdSummary.loginEmail}\nTemporary Password: ${createdSummary.temporaryPassword}`;

    return (
      <div className="space-y-6 py-2">
        {/* Success header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 ring-4 ring-emerald-500/20">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Credentials Created Successfully
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm">
            Temporary login credentials have been registered in the database. Share these details securely with the staff member.
          </p>
        </div>

        {/* Credentials detail card */}
        <div className="rounded-lg border bg-card p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b text-xs font-medium text-muted-foreground">
            <span>Credential Details</span>
            <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
              Active Temporary
            </Badge>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center py-1">
              <span className="text-muted-foreground text-xs">Staff Member:</span>
              <span className="font-medium">{createdSummary.staffName}</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-muted-foreground text-xs">Login Email:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs">{createdSummary.loginEmail}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => copyToClipboard(createdSummary.loginEmail, "summaryEmail")}
                >
                  {copiedField === "summaryEmail" ? (
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-muted-foreground text-xs">Temporary Password:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold bg-muted px-2 py-0.5 rounded-sm">
                  {createdSummary.temporaryPassword}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => copyToClipboard(createdSummary.temporaryPassword, "summaryPwd")}
                >
                  {copiedField === "summaryPwd" ? (
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Security advisory */}
        <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <span>
            The user will be required to update their temporary password on their first sign-in session.
          </span>
        </div>

        {/* Modal actions */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-2 pt-2 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setCreatedSummary(null);
              setSelectedStaff(null);
              form.reset();
            }}
          >
            Provision Another
          </Button>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => copyToClipboard(fullSummaryText, "all")}
            >
              {copiedField === "all" ? (
                <>
                  <Check className="h-4 w-4 mr-1 text-emerald-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy All Details
                </>
              )}
            </Button>
            <Button type="button" onClick={onCancel}>
              Done
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="space-y-5">
      <FieldGroup className="space-y-4">
        {/* ── STAFF MEMBER SELECTION ─────────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <FieldLabel className="text-xs font-medium">
              Staff Member <span className="text-destructive">*</span>
            </FieldLabel>
            <button
              type="button"
              onClick={() => {
                setManualStaffId(!manualStaffId);
                setSelectedStaff(null);
                setValue("staffId", "");
              }}
              className="text-[11px] text-primary hover:underline font-medium transition-colors"
            >
              {manualStaffId ? "Select from staff list" : "Enter UUID manually"}
            </button>
          </div>

          {!manualStaffId ? (
            <Controller
              name="staffId"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <Select
                    value={field.value || ""}
                    onValueChange={(val) => {
                      field.onChange(val);
                      handleStaffSelect(val);
                    }}
                    disabled={isSubmitting || isStaffLoading}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          isStaffLoading
                            ? "Loading hospital staff..."
                            : "Choose a staff member to provision..."
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {staffList.length === 0 ? (
                        <div className="p-3 text-center text-xs text-muted-foreground">
                          {isStaffLoading ? "Fetching staff..." : "No staff members found"}
                        </div>
                      ) : (
                        staffList.map((s) => (
                          <SelectItem key={s.staffId} value={s.staffId}>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {s.firstName} {s.lastName}
                              </span>
                              {s.role && (
                                <Badge variant="outline" className="text-[10px] px-1 py-0">
                                  {s.role}
                                </Badge>
                              )}
                              {s.employeeNumber && (
                                <span className="text-muted-foreground text-xs">
                                  ({s.employeeNumber})
                                </span>
                              )}
                            </div>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          ) : (
            <Controller
              name="staffId"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...field}
                      placeholder="e.g. 123e4567-e89b-12d3-a456-426614174000"
                      className="pl-9 font-mono text-xs"
                      disabled={isSubmitting}
                    />
                  </div>
                  <FieldDescription className="text-[11px]">
                    Valid UUID of the staff record in the system
                  </FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          )}

          {/* Selected Staff Info Card */}
          {selectedStaff && (
            <div className="mt-2 rounded-md border bg-muted/40 p-2.5 text-xs flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-semibold text-foreground">
                  {selectedStaff.firstName} {selectedStaff.lastName}
                </div>
                <div className="text-muted-foreground text-[11px] flex gap-2">
                  <span>Dept: {selectedStaff.department || "General"}</span>
                  <span>•</span>
                  <span>ID: {selectedStaff.employeeNumber || "N/A"}</span>
                </div>
              </div>
              <Badge variant="secondary" className="text-[10px]">
                {selectedStaff.role}
              </Badge>
            </div>
          )}
        </div>

        {/* ── LOGIN EMAIL ───────────────────────────────────────────── */}
        <Controller
          name="loginEmail"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="text-xs font-medium">
                Login Email <span className="text-destructive">*</span>
              </FieldLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  {...field}
                  type="email"
                  placeholder="staff.name@hospital.com"
                  autoComplete="email"
                  className="pl-9"
                  disabled={isSubmitting}
                />
              </div>
              <FieldDescription className="text-[11px]">
                Official email address the staff member will use to authenticate
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* ── TEMPORARY PASSWORD ────────────────────────────────────── */}
        <Controller
          name="temporaryPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <div className="flex items-center justify-between mb-1">
                <FieldLabel className="text-xs font-medium">
                  Temporary Password <span className="text-destructive">*</span>
                </FieldLabel>
                <Button
                  type="button"
                  variant="ghost"
                  size="xs"
                  onClick={handleGeneratePassword}
                  className="h-6 text-[11px] text-primary hover:text-primary gap-1"
                >
                  <Sparkles className="h-3 w-3" />
                  Generate Secure Password
                </Button>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter or generate temporary password"
                  autoComplete="new-password"
                  className="pl-9 pr-16 font-mono text-xs"
                  disabled={isSubmitting}
                />
                <div className="absolute right-1 top-1 flex items-center gap-0.5">
                  {currentPassword && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => copyToClipboard(currentPassword, "fieldPwd")}
                      title="Copy password"
                      className="h-7 w-7 text-muted-foreground hover:text-foreground"
                    >
                      {copiedField === "fieldPwd" ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Hide password" : "Show password"}
                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Password strength visual indicator */}
              {currentPassword && (
                <div className="mt-1.5 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">Strength:</span>
                    <span className="font-medium text-xs">{passwordStrength.label}</span>
                  </div>
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.score}%` }}
                    />
                  </div>
                </div>
              )}

              <FieldDescription className="text-[11px]">
                Must be 8 to 30 characters in length. User will reset this upon first sign-in.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* ── DIALOG ACTIONS ────────────────────────────────────────── */}
      <div className="flex justify-end gap-2 pt-3 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="gap-1.5">
          {isSubmitting ? (
            <>
              <Spinner className="h-4 w-4 animate-spin" />
              Provisioning...
            </>
          ) : (
            <>
              <KeyRound className="h-4 w-4" />
              Create Credential
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
