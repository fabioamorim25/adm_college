'use client'

import { SessionProvider } from "next-auth/react";
import React,{ReactNode} from "react";

interface AuthSessionProviderProps{
  children: ReactNode
}

export default function AuthSessionProvider({children}:AuthSessionProviderProps) {
  return (
	<SessionProvider>
	   {children}
	</SessionProvider>
  )
}