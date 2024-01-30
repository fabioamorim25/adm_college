import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"

import Image from 'next/image'
import interfaceHome from "../../ex-interface-home.png"

export default async function HomeAdmin() {

  const session = await getServerSession(nextAuthOptions)

  return (
    <main className="mx-auto">
      <h1>Página Home admin</h1>
      <h2>{JSON.stringify(session?.user.dep_name)}</h2>
      {/* <h2>{JSON.stringify(session)}</h2> */}
     
     <Image src={interfaceHome} alt="exemplo para a interface da minha home" />

      
    </main>
  )
}