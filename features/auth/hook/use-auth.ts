import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "../api/auth.service";
import { setAccessToken, setCurrentUser, setRefreshToken } from "@/lib/auth";
import { LoginRequest, CreateCredentialRequest } from "../types/login-response";

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
        mustChangePassword: data.mustChangePassword,
      });

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
