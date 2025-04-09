<<<<<<< HEAD
import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"

export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth({
    callbacks: {
        async session({token, session}) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            return session;
        }
=======
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {prisma} from "@/lib/prisma";

export const { handlers:{GET, POST}, auth, signIn, signOut } = NextAuth({
    callbacks: {
      async session({session, token}){
          if(token.sub && session.user){
              session.user.id = token.sub;
          }
          return session;
      }
>>>>>>> 50deb1af6e9ea6480a47b99c817a5c399138bfb4
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
})