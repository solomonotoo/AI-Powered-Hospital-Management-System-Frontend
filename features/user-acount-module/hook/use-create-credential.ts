import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/users.service";
import { CreateCredentialRequest } from "../types/users";
import { usersQueryKeys } from "./use-users";
import { toast } from "sonner";

// Custom mutation hook to create staff credentials based on OpenAPI specification
export function useCreateCredential() {
  const queryClient = useQueryClient();

  return useMutation({
    // Calls the backend /api/v1/auth/credentials endpoint
    mutationFn: (data: CreateCredentialRequest) =>
      usersService.createCredential(data),

    // Invalidate users list & summary queries so table and cards auto-refresh
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersQueryKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: ["userSummary"],
      });
      toast.success("User credentials created successfully!");
    },

    // Handle and display meaningful error notification
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        "Failed to create user credentials. Please check details and try again.";
      toast.error(message);
    },
  });
}
