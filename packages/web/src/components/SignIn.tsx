'use client'

import React, { FormEvent, useState } from "react";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log({ email, password });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white-50 py-32 px-6 mt-10 lg:mt-0 lg:w-1/3 rounded-lg shadow-md flex flex-col justify-between h-full">
      <h1 className="text-3xl font-alt text-center text-gray-700 mb-10">Logo</h1>

      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-alt text-gray-800">Digite seu Email</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full px-3 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-alt text-gray-800">Digite sua Senha</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full px-3 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <Link href="#" className="text-xs font-sans text-blue-600 hover:underline mb-4 block">
        Forget Password?
      </Link>

      <button
        className="mt-2 w-full font-sans px-4 py-2  transition-colors duration-200 transform bg-gray-200 rounded-md hover:bg-orange-900 mb-4"
      >Login
      </button>

      <p className="font-sans text-sm text-center text-gray-700">
        Don't have an account?{" "}
        <Link href="#" className="font-alt hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  )
}
