/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/auth.config.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { LoginResponse } from "./interfaces/login";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        deviceKey: { label: "Device Key", type: "text", optional: true },
      },
      async authorize(credentials) {
        try {
          const { data }: { data: LoginResponse } = await axios.post(
            "https://your-backend.com/api/login",
            {
              email: credentials?.email,
              password: credentials?.password,
              deviceKey: credentials?.deviceKey || "",
            }
          );

          const { accessToken, refreshToken, user } = data.data;

          if (accessToken && user) {
            return {
              id: user._id,
              ...user,
              accessToken,
              refreshToken,
            };
          }

          return null;
        } catch (error: any) {
          throw new Error(error.response?.data?.message || "Login failed");
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.accessToken = (user as any).accessToken;
        token.refreshToken = (user as any).refreshToken;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
