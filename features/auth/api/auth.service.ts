import { api } from "@/lib/axios";
import { API_ROUTES } from "@/lib/api-routes";
import { ApiResponse } from "@/features/types/api-response";
import {
  LoginRequest,
  LoginResponse,
  CreateCredentialRequest,
} from "../types/login-response";
import { RefreshTokenRequest, RefreshTokenResponse } from "../types/refresh-token";

class AuthService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse> | LoginResponse>(
      API_ROUTES.AUTH.LOGIN,
      data
    );
    // console.log("RAW LOGIN RESPONSE:", response.data);
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

  async refreshToken(data: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const response = await api.post<ApiResponse<RefreshTokenResponse> | RefreshTokenResponse>(
      API_ROUTES.AUTH.REFRESH,
      data
    );

    const body = response.data;
    if (
      body &&
      typeof body === "object" &&
      "success" in body &&
      "data" in body
    ) {
      return (body as ApiResponse<RefreshTokenResponse>).data
    }
    return body as RefreshTokenResponse;
  }

  async createCredentials(data: CreateCredentialRequest): Promise<void> {
    await api.post(API_ROUTES.AUTH.CREDENTIALS, data);
  }

  async selectFacility(data: import("../types/login-response").SelectFacilityRequest): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse> | LoginResponse>(
      API_ROUTES.AUTH.SELECT_FACILITY,
      data
    );
    const body = response.data;
    if (body && typeof body === "object" && "success" in body && "data" in body) {
      return (body as ApiResponse<LoginResponse>).data;
    }
    return body as LoginResponse;
  }

  async firstLoginPasswordChange(data: import("../types/login-response").FirstLoginPasswordChangeRequest): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse> | LoginResponse>(
      API_ROUTES.AUTH.FIRST_LOGIN_PASSWORD_CHANGE,
      data
    );
    const body = response.data;
    if (body && typeof body === "object" && "success" in body && "data" in body) {
      return (body as ApiResponse<LoginResponse>).data;
    }
    return body as LoginResponse;
  }

  async changePassword(data: import("../types/login-response").ChangePasswordRequest): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse> | LoginResponse>(
      API_ROUTES.AUTH.CHANGE_PASSWORD,
      data
    );
    const body = response.data;
    if (body && typeof body === "object" && "success" in body && "data" in body) {
      return (body as ApiResponse<LoginResponse>).data;
    }
    return body as LoginResponse;
  }
}

export const authService = new AuthService();
