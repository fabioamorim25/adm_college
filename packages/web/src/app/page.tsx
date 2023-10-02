import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"

export default async function Home() {

  const session = await getServerSession(nextAuthOptions)

  return (
    <div>
      <h1>Pagina admin</h1>
      <h2>{session?.user.name}</h2>
      <h2>{JSON.stringify(session)}</h2>
    </div>
  )
}