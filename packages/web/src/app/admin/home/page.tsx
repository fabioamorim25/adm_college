import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"


export default async function HomeAdmin() {

  const session = await getServerSession(nextAuthOptions)

  return (
    <main className="mx-auto">
      <h1>Página Home admin</h1>
      <h2>{JSON.stringify(session?.user.dep_name)}</h2>
      {/* <h2>{JSON.stringify(session)}</h2> */}
     

      
    </main>
  )
}