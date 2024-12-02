import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { CloudFog } from "lucide-react";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const requestBody = new URLSearchParams({
          grant_type: "password",
          username: credentials.email,
          password: credentials.password,
          scope: "",
          client_id: "string",
          client_secret: "string",
        });

        const response = await fetch(`${process.env.AUTH_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
          },
          body: requestBody.toString(),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || data.message || "Login failed");
        }

        // Capture additional fields as needed
        if (data.access_token) {
          return {
            ...data,
            email: credentials.email,
            access_token: data.access_token,
            id: data.user_id, // assuming the API returns a user_id field
            name: data.name, // assuming the API returns a name field
            image: data.image // assuming the API returns an image URL
          };
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {

      if (user && account?.provider === "google") {
        const googleUser = {
          username: token.name,
          email: token.email,
          image: token.picture,
          sub: token.sub
        }
        try {
          const response = await fetch(
            `${process.env.AUTH_URL}/auth/third_party_login`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
                "Accept": "application/json",
              },
              body: JSON.stringify(googleUser),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to authenticate with third party login");
          }
          const data = await response.json();
          console.log("data: ", data)
          token.id = data.payload.sub;
          token.name = data.payload.username;
          token.email = data.payload.email;
          token.image = data.payload.profile_img;
          token.access_token = data?.access_token
        } catch (error) {
          throw new Error("Error sending Google login to server: ", error)
        }

      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      session.access_token = token.access_token;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/"
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
