import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.access_token = user.access_token;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      session.access_token = token.access_token;
      console.log("sessionauth",session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
