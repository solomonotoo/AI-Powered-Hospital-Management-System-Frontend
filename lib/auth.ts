const TOKEN_KEY = "access_token";

export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAccessToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeAccessToken() {
  localStorage.removeItem(TOKEN_KEY);
}

const USER_KEY = "auth_user";

export interface AuthUser {
  staffId: string;
  fullName: string;
  role: string;
  mustChangePassword: boolean;
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem(USER_KEY);
  if (!user) return null;
  try {
    return JSON.parse(user) as AuthUser;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: AuthUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function removeCurrentUser() {
  localStorage.removeItem(USER_KEY);
}

export function clearAuth() {
  removeAccessToken();
  removeCurrentUser();
  if (typeof window !== "undefined") {
    window.location.href = "/auth/login";
  }
}