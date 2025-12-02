import { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import KebabscribUser from "@model/kebabscrib_user";
import connectMongodb from "@lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
const dotenv = await import("dotenv");
dotenv.config({ path: ".env.local" });

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await connectMongodb();
        const user = await KebabscribUser.findOne({
          email: credentials.email,
        });
        console.log("fetching user [authorise]");
        console.log(user);
        if (!user) {
          console.log("Email not recognised");
          throw new Error("Email is not registered");
        }
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isPasswordCorrect) {
          console.log("Password is incorrect");
          throw new Error("Password is incorrect");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.role = user.role;
        token.user_name = user.user_name;
        token.email = user.email;
        token.verified = user.verified;  
      }
      return token;
    },
    async session({ session, token }) {
      
      session.user._id = token._id;
      session.user.role = token.role;
      session.user.user_name = token.user_name;
      session.user.email = token.email;
      session.user.verified = token.verified;
      return session;
    },
  }, 
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login",
  },
  jwt :{
  
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,

};
