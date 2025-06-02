/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useAuthorization.ts
import { useMemo } from "react";
import { useAuthStore } from "./use-session";

export function useAuthorization() {
  const { session } = useAuthStore((state) => state);
  const user = session?.user ?? null;
  const role = user?.role?.name ?? null;
  const permissions = user?.role?.permissions ?? {};

  const hasPermission = (perm: string): boolean => {
    return permissions?.[perm] !== undefined;
  };

  const isRole = (roleName: string): boolean => {
    return role === roleName;
  };

  return useMemo(
    () => ({
      user,
      role,
      permissions,
      isAdmin: role === "admin",
      isSeller: user?.isSeller ?? false,
      hasPermission,
      isRole,
    }),
    [session]
  );
}
