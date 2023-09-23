"use client"

import Link from "next/link";

export default function Error() {
  return (
    <html>
      <body className="container mx-auto mb-24 p-4 md:mb-0 md:w-screen md:pl-24">
        <h1>Deu erro procure o suporte</h1>
        <Link href={"#"}>Recarregar a pagina</Link>
      </body>
    </html>
  );
}