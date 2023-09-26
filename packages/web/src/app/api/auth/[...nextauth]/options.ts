import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const options: NextAuthOptions = {
  providers: [
    //AUTH EXTERNO: 

    //AUTH INTERNO DO SISTEMA: 
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
      async authorize(credentials) {
        if (!credentials)
          throw new Error("Credentials are not provided");

        const { email, password } = credentials;

        //FAZER REQUISIÇÃO PARA O BACK END PASSANDO OS DADOS
        const response = await fetch("http://localhost:5000/SignIn", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
        })

        //VALIDAR OS DADOS RECEBIDOS DO BACK END:
        if (response.ok) {
          // Analise apenas o id,role, token
          const data = await response.json();
          
          if (data && data.user && data.user.id && data.user.role && data.token) {
            return data;
          } else {
            throw new Error("Invalid user data");
          }

        } else {
          throw new Error("Invalid response");
        }
      }

    })
  ],
  pages: {
    signIn: "/SignIn"
  }
}


