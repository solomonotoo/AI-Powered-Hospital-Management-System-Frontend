import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "../api/auth.service";
import { setAccessToken, setCurrentUser, setRefreshToken } from "@/lib/auth";
import {
  LoginRequest,
  CreateCredentialRequest,
  FirstLoginPasswordChangeRequest,
  SelectFacilityRequest,
} from "../types/login-response";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (data) => {
      // Save token and user details
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      setCurrentUser({
        staffId: data.staffId,
        fullName: data.fullName,
        role: data.role,
        facilityId: data.facilityId,
        facilityName: data.facilityName,
        facilityCode: data.facilityCode,
        mustChangePassword: data.mustChangePassword,
        canSelectFacility: data.canSelectFacility,
        accessibleFacilities: data.accessibleFacilities,
      });

      if (data.mustChangePassword) {
        toast.warning("First login detected. You must change your temporary password before proceeding.");
        router.push("/auth/first-login-password-change");
        return;
      }

      toast.success(`Welcome back, ${data.fullName}!`);

      // Navigate to dashboard
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        "Login failed. Please check your email and password.";
      toast.error(message);
    },
  });
}

export function useFirstLoginPasswordChange() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: FirstLoginPasswordChangeRequest) =>
      authService.firstLoginPasswordChange(data),
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      setCurrentUser({
        staffId: data.staffId,
        fullName: data.fullName,
        role: data.role,
        facilityId: data.facilityId,
        facilityName: data.facilityName,
        facilityCode: data.facilityCode,
        mustChangePassword: false,
        canSelectFacility: data.canSelectFacility,
        accessibleFacilities: data.accessibleFacilities,
      });

      toast.success("Password set successfully! Welcome to your dashboard.");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update password. Please ensure requirements are met.";
      toast.error(message);
    },
  });
}

export function useSelectFacility() {
  return useMutation({
    mutationFn: (data: SelectFacilityRequest) =>
      authService.selectFacility(data),
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      setCurrentUser({
        staffId: data.staffId,
        fullName: data.fullName,
        role: data.role,
        facilityId: data.facilityId,
        facilityName: data.facilityName,
        facilityCode: data.facilityCode,
        mustChangePassword: data.mustChangePassword,
        canSelectFacility: data.canSelectFacility,
        accessibleFacilities: data.accessibleFacilities,
      });

      toast.success(`Switched active facility to ${data.facilityName || data.facilityCode}`);
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to switch facility.";
      toast.error(message);
    },
  });
}

export function useCreateCredentials() {
  return useMutation({
    mutationFn: (data: CreateCredentialRequest) =>
      authService.createCredentials(data),
    onSuccess: () => {
      toast.success("Staff credentials created successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to create staff credentials.";
      toast.error(message);
    },
  });
}
