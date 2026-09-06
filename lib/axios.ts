//axios instance to be used by the whole application

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { env } from "./env";
import {
  clearAuth,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "./auth";
import { error } from "console";
import { ApiResponse } from "@/features/types/api-response";
import { RefreshTokenResponse } from "@/features/auth/types/refresh-token";
import { API_ROUTES } from "./api-routes";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// ============================================================
// MAIN API INSTANCE
// ============================================================

export const api = axios.create({
  baseURL: env.API_URL, //application base url.Your backend URL (e.g., https://api.yourhospital.com)
  timeout: env.REQUEST_TIMEOUT, //application timeout for requests.How long to wait before timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================================
// REFRESH TOKEN INSTANCE
// ============================================================
//
// IMPORTANT:
// This instance does NOT use the access-token interceptor.
// Otherwise /auth/refresh could trigger another refresh cycle.

const refreshApi = axios.create({
  baseURL: env.API_URL,
  timeout: env.REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

//request interceptors- Adds JWT token to every request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    //remove this code before production deploument
    // Development authentication bypass
    // if (env.BYPASS_AUTH) {
    //   return config;
    // }

    const token = getAccessToken(); // Gets the stored JWT
    // console.log("========== API REQUEST ==========");
    // console.log("METHOD:", config.method?.toUpperCase());
    // console.log("URL:", config.url);
    // console.log("BASE URL:", config.baseURL);
    // console.log("FULL URL:", `${config.baseURL ?? ""}${config.url ?? ""}`);
    // console.log("HAS TOKEN:", !!token);
    // console.log("=================================");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adds to header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//response interceptors
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // ----------------------------------------------------------
    // Development authentication bypass
    // ----------------------------------------------------------
    if (env.BYPASS_AUTH) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as RetryableRequestConfig | undefined;

    // ----------------------------------------------------------
    // No request configuration
    // ----------------------------------------------------------
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // ----------------------------------------------------------
    // Prevent infinite retry loops
    // ----------------------------------------------------------
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // ----------------------------------------------------------
    // Do not attempt refresh on the refresh endpoint itself
    // ----------------------------------------------------------
    if (originalRequest.url?.includes(API_ROUTES.AUTH.REFRESH)) {
      clearAuth();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // ----------------------------------------------------------
    // Get refresh token
    // ----------------------------------------------------------
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      clearAuth();
      return Promise.reject(error);
    }

    try {
      // --------------------------------------------------------
      // Request new tokens
      // --------------------------------------------------------

      const refreshResponse = await refreshApi.post<
        ApiResponse<RefreshTokenResponse> | RefreshTokenResponse
      >(API_ROUTES.AUTH.REFRESH, {
        refreshToken,
      });

      const body = refreshResponse.data;

      // --------------------------------------------------------
      // Support both:
      //
      // {
      //   accessToken: ...
      // }
      //
      // and:
      //
      // {
      //   success: true,
      //   data: {
      //      accessToken: ...
      //   }
      // }
      // --------------------------------------------------------

      const tokenData =
        body && typeof body === "object" && "success" in body && "data" in body
          ? body.data
          : body;

      const newAccessToken = tokenData?.accessToken;
      const newRefreshToken = tokenData?.refreshToken;

      if (!newAccessToken) {
        throw new Error("Refresh response did not contain access token");
      }
      // --------------------------------------------------------
      // Store new access token
      // --------------------------------------------------------
      setAccessToken(newAccessToken);

      // optionally update refresh token if provided
      if (newRefreshToken) {
        setRefreshToken(newRefreshToken);
      }
      // --------------------------------------------------------
      // Update Authorization header
      // --------------------------------------------------------
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      // --------------------------------------------------------
      // If refresh fails → clear session
      // --------------------------------------------------------
      clearAuth();
      return Promise.reject(error);
    }
  }
);
// Notice how every API request now automatically includes the JWT once authentication is in place.
