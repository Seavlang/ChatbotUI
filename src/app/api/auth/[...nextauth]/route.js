import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        console.log(credentials);
        // if (!credentials || !credentials?.email || !credentials?.password) {
        //   return null;
        // }
        const response = await fetch(`${process.env.BASE_URL}/auths/login`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        console.log("userdata", data);
        switch (data.detail) {
          case "Your account is not verify yet":
          throw new Error("Your account is not verify yet")
          case "Invalid Password":
            throw new Error("Invalid password")
          case "Invalid email":
              throw new Error("Email does not exist")
        }
        if(data.errors){
          throw new Error(data.errors.password)
        }
        const detail = {
          ...data,
          email: credentials.email,
          // password: credentials.password
        };

        if (!data.token) {
          return;
        } else {
          return detail;
        }
        // const login = async(body)=> {
        //     const data = await fetch("http://110.74.194.123:8989/api/todo/v1/auth/login",{
        //     method: "POST",
        //     body: JSON.stringify(body),
        //     headers: {"Content-Type": "application.json"}
        //     })
        // }

        // return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      console.log(session);
      session.user = token.user;
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {  
      if (user) {
        token.user = user;
      }
      return token;
    },async session({ session, token }) {
      session.user = token.user;
      session.user.id = token.id;
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
