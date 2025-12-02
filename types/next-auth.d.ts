import type { DefaultSession, User as NextAuthUser } from "next-auth";
import type { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      _id: string;
      role: string;
      email: string;
      user_name: string;
      verified: boolean;
    };
  }

  interface User extends NextAuthUser {
    _id: string;
    role: string;
    email: string;
    user_name: string;
    verified: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    _id: string;
    role: string;
    email: string;
    user_name: string;
    verified: boolean;
  }
}

export {};
