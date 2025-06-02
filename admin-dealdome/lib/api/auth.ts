// lib/api/auth.ts
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const result = await signIn("credentials", {
    redirect: false,
    ...credentials,
  });

  if (result?.ok) {
    toast.success("Logged in");
    return result;
  } else {
    toast.error(result?.error || "Login failed");
    throw new Error(result?.error || "Login failed");
  }
};
