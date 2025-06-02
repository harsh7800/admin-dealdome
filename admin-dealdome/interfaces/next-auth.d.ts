// // types/next-auth.d.ts

// // Define your custom user type based on your API response
// interface AuthUser {
//   id: string;
//   name: string;
//   email: string;
//   image?: string;
//   role: string;
//   // Add other properties from your user object as needed
// }

// declare module "next-auth" {
//   interface Session {
//     user: AuthUser;
//     accessToken: string;
//     refreshToken: string;
//   }

//   interface User extends AuthUser {
//     accessToken: string;
//     refreshToken: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     user: AuthUser;
//     accessToken: string;
//     refreshToken: string;
//   }
// }

import { AuthUser } from "./login";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: AuthUser & {
      accessToken: string;
      refreshToken: string;
    } & DefaultSession["user"];
  }
}
