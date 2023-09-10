'use client'
import Link from "next/link";
import { FormEvent, useState } from "react";

import Image from "next/image";
import background from '../assets/a61h7-tctg3.svg'


export default function SignIn() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log({ email, password });
  }


  return (
    <div className="flex flex-col-reverse items-center justify-center w-full lg:flex-row lg:max-w-6xl">
      <div className="hidden lg:p-0 lg:w-auto lg:block">
        <Image src={background} alt="Login Image" />
      </div>

      <div className="w-full p-6 shadow-md lg:max-w-xl">

        <h1 className="text-3xl font-alt text-center text-gray-700">Logo</h1>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-alt text-gray-800">Digite seu Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-alt text-gray-800">Digite sua Senha</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <Link href="#" className="text-xs font-sans text-blue-600 hover:underline">
            Forget Password?
          </Link>

          <div className="mt-2">
            <button
              className="w-full font-sans px-4 py-2  transition-colors duration-200 transform bg-gray-200 rounded-md hover:bg-orange-900"
            >Login
            </button>
          </div>

        </form>

        <p className="mt-4 font-sans text-sm text-center text-gray-700">
          Don't have an account?{" "}
          <Link href="#" className="font-alt hover:underline">
            Sign up
          </Link>
        </p>

      </div>

    </div>
  )
}
