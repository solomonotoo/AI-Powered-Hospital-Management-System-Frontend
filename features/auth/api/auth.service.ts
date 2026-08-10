import { api } from "@/lib/axios";
import { API_ROUTES } from "@/lib/api-routes";
import { ApiResponse } from "@/features/types/api-response";
import { LoginRequest, LoginResponse, CreateCredentialRequest } from "../types/auth";

class AuthService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse> | LoginResponse>(
      API_ROUTES.AUTH.LOGIN,
      data
    );

    const body = response.data;
    // Check if the response matches the standard ApiResponse wrapper
    if (
      body &&
      typeof body === "object" &&
      "success" in body &&
      "data" in body
    ) {
      return (body as ApiResponse<LoginResponse>).data;
    }
    return body as LoginResponse;
  }

  async createCredentials(data: CreateCredentialRequest): Promise<void> {
    await api.post(
      API_ROUTES.AUTH.CREDENTIALS,
      data
    );
  }
}

export const authService = new AuthService();
