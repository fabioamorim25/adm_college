import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



export const nextAuthOptions: NextAuthOptions = {
  //DEFINIR OS PROVEDORES: provedor interno
  providers: [
    // AUTH EXTERNO: 

    //  AUTH INTERNO DO SISTEMA: 
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "Digite Seu Email"
        },
        password: {
          label: "Password",
          type: "password",
        }
      },
      async authorize(credentials, req) {
       
        if (!credentials?.email || !credentials.password)
           return false
  
          const { email, password } = credentials;
  
        const response = await fetch("http://localhost:5000/SignIn", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        })

        const user = await response.json();

        if (user && response.ok) {
          return user
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      user && (token.user = user)

      return token;
    },
    async session({ session, user, token }) {
      session = token.user as any
      return session;
    },
  },
  session: {
    strategy: "jwt"
  }, 
  jwt: {
    secret:process.env.NEXTAUTH_SECRET, maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: "/SignIn"
  },
  debug: process.env.NODE_ENV !== "development"
}