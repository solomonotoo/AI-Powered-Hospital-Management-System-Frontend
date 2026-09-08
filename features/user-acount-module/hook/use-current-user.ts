import { useSyncExternalStore } from "react";
import { AuthUser } from "@/lib/auth";

let cachedRawUser: string | null = null;
let cachedParsedUser: AuthUser | null = null;

function getSnapshot(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("auth_user");
  if (raw === cachedRawUser) {
    return cachedParsedUser;
  }
  cachedRawUser = raw;
  if (!raw) {
    cachedParsedUser = null;
    return null;
  }
  try {
    cachedParsedUser = JSON.parse(raw) as AuthUser;
    return cachedParsedUser;
  } catch {
    cachedParsedUser = null;
    return null;
  }
}

function getServerSnapshot(): null {
  return null;
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export const useCurrentUser = (): { user: AuthUser | null; isLoading: boolean } => {
  const user = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return { user, isLoading: false };
};
