import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
    //   credentials: {
    //     email: {},
    //     password: {},
    //   },
      async authorize(credentials) {
        // Encode request body as application/x-www-form-urlencoded
        const requestBody = new URLSearchParams({
          grant_type: "password",
          username: credentials.email,
          password: credentials.password,
          scope: "",
          client_id: "string",
          client_secret: "string",
        });

        const response = await fetch(`${process.env.NEXTAUTH_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
          },
          body: requestBody.toString(),
        });

        const data = await response.json();
        console.log("Response data:", data);

        if (!response.ok) {
          throw new Error(data.detail || data.message || "Login failed");
        }

        if (data.access_token) {
          return { ...data, email: credentials.email, access_token: data.access_token};
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.access_token = token.access_token;
      console.log("session:", session);
      return session;
    },
    async jwt({ user, token }) {
      
      if (user) {
        token.id = user.id;
      }
      console.log("token:", token);
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };