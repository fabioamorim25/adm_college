// import { getCurrentUse } from "@/lib/session";

import { getServerSession } from "next-auth";
export default async function Home() {

  // const user = await getCurrentUse()
  const session = await getServerSession()
  return (
    <main>

    <h1>Página Principal</h1>
    <div>{JSON.stringify(session)}</div> 
    
    </main >
  );
}
