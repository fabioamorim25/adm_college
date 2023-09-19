import { ReactNode } from 'react'

import Image from "next/image";
import background from '../../../assets/banner.png'
import '../../globals.css'


export const metadata = {
  title: 'SignIn',
  description: 'Pagina de autenticação com o sistema',
}



export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className='bg-orange-900 min-h-screen flex items-center justify-center'>
        <div className="flex flex-col lg:flex-row lg:justify-between w-full max-w-6xl p-4 lg:p-0">
        <div className="lg:p-0 lg:w-2/3 flex items-center justify-center">
          <Image src={background} alt="Login Image" width={700} />
        </div>
          {children}
        </div>        
      </body>
    </html>
  )
}

