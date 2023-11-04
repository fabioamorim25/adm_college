import { ReactNode } from 'react'
import '../../styles/globals.css'

import SidebarAdmin from '@/components/SidebarAdmin'
import Header from '@/components/Header'

import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as Baijamjuree
} from 'next/font/google'


import { WorkDataContextPorvider } from '@/context/contextAdmin/WorkDataStoreProvider'



// DEFINIR AS FONTES:
const roboto = Roboto({
  subsets: ['latin'],
  weight: '100',
  variable: '--font-roboto'
})
const baijamjuree = Baijamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree'
})


export const metadata = {
  title: 'PageAdmin',
  description: 'página admin do departamento',
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt" className="h-full">
      <body className={`${roboto.variable} ${baijamjuree.variable} font-sans flex flex-col h-screen`} >
        <Header className="w-full" />
        <div className="flex flex-grow">
          <SidebarAdmin />

          <main className="flex-grow bg-white overflow-auto h-screen scroll-smooth cursor-auto">
            <WorkDataContextPorvider>
              {children}
            </WorkDataContextPorvider>
          </main>

        </div>
      </body>
    </html>
  )
}