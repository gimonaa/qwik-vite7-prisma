import { type DefaultSession, QwikAuth$ } from "@auth/qwik";
import Credentials from "@auth/qwik/providers/credentials";
// import { createHmac } from "crypto";
// import { ZodError } from "zod";
// import { prisma } from "~/lib/prisma.server";
import { PrismaClient } from "@prisma/client";

import { signInSchema } from "~/lib/zod";

declare module "@auth/qwik" {
  interface Session {
    user: {
      role: string;
      error: string;
    } & DefaultSession["user"];
  }
}

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  ({ env }) => ({
    // adapter: PrismaAdapter(prisma),
    secret: env.get("AUTH_SECRET"),
    trustHost: true,

    session: {
      maxAge: 30000,
      strategy: "jwt",
    },
    pages: {
      signIn: "/login",
      signOut: "/logout",
      error: "/login",
    },
    providers: [
      Credentials({
        name: "Login",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials): Promise<any> {
          try {
            // const prisma = new PrismaClient();
            await signInSchema.parseAsync(credentials);

            // if (!email || !password) {
            //   return null;
            // }
            const prisma = new PrismaClient();
            const user = await prisma.user.findUnique({
              where: {
                email: String(credentials.email),
              },
            });
            // const user = {
            //   id: 1,
            //   name: "Ale",
            //   email: "a@b.it",
            //   role: "ADMIN",
            //   password: "password",
            // }

            if (user) {
              // const secret = String(env.get("AUTH_SECRET"));
              // const hashPass = createHmac("sha256", secret)
              //   .update(String(credentials.password))
              //   .digest("hex");

              // if (user.password === hashPass) {
                return {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  role: user.role,
                };
              // }
            }

            return null;
          } catch (err) {
            console.debug("error", err);
            return null;
            // if (err instanceof ZodError) {
            //   console.error("zod error", err);
            //   return null;
            // }
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        // if (token.error) return {error: token.error};
        // console.debug("jwt", token, user);
        return { ...token, ...user };
      },
      async session({ session, token }) {
        // if (token.error) return {error: token.error};
        // console.debug("session", session, token);
        return { ...session, user: { ...token } };
      },
      async signIn({ user }) {
        // console.log("signIn user", user);
        // if (user.error) {
        //   throw new InvalidLoginError(user.error)
        // }
        // if (!user) return false;
        if (!user) return false;
        if (!user.id) return false;
        // user?.id &&
        //   +user.id &&
        // const prisma = new PrismaClient();
        // AAAA 
        // (await prisma.user.update({
        //   where: { id: +user.id },
        //   data: { lastlogin: new Date() },
        // }));
        // console.log("signIn user", user)
        return true;
      },
    },
  }),
);
