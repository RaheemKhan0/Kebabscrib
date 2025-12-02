// types/next-auth.d.ts (or anywhere accessible with correct tsconfig path)

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      role: string;
      email: string;
      user_name: string;
      verified : boolean;
    };
  }

  interface User {
    _id: string;
    role: string;
    email: string;
    user_name: string;
    verified : boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    role: string;
    email: string;
    user_name: string;
    verified : boolean;
  }
}

