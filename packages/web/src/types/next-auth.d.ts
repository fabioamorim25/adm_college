import NextAuth from "next-auth/next";

declare module 'next-auth' {
  interface Session {
    user: {
      dep_name: ReactNode;
      id: string
      email: string
      name: string
    }
    token:string
  }



  
}