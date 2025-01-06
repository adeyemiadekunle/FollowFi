import Twitter from "next-auth/providers/twitter";
import type { NextAuthConfig } from "next-auth";
import { prisma } from "./lib/prisma";

export default {
  providers: [
    Twitter({
      clientId: process.env.AUTH_TWITTER_ID!,
      clientSecret: process.env.AUTH_TWITTER_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      // Ensure `id` is added to the session user object
      if (user) {
        session.user = {
          ...session.user,
          id: user.id,
        };
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "twitter" && profile) {
        const twitterProfile = profile as {
          data: { username: string; profile_image_url: string; name: string };
        };
        const { username, profile_image_url, name } = twitterProfile.data;
        try {
          await prisma.user.upsert({
            where: { id: user.id },
            update: {
              xUsername: username, // Twitter username
              image: profile_image_url, // Twitter profile image URL
            },
            create: {
              id: user.id,
              xUsername: username,
              name,
              image: profile_image_url,
            },
          });
          return true;
        } catch (error) {
          console.error("Error upserting user:", error);
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development", // Enable debug only in development
} satisfies NextAuthConfig;
