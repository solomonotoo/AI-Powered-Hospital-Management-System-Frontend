// features/auth/hook/use-current-user.ts
import { useEffect, useState } from "react";
import { AuthUser, getCurrentUser } from "@/lib/auth";

//AuthUser give the correct value for currentUserId:staffId
export const useCurrentUser = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  return { user, isLoading };
};
