import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      name: "Guest Access",
      credentials: { email: { label: "Email", type: "text" } },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        let user = await db.user.findUnique({ where: { email: credentials.email } });
        if (!user) {
            user = await db.user.create({ data: { email: credentials.email, name: "Guest User" } });
        }
        return user;
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    }
  }
};