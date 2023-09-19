import { ReactNode } from 'react'
import './globals.css'

import { 
  Roboto_Flex as Roboto,
  Bai_Jamjuree as Baijamjuree
} from 'next/font/google'



// DEFINIR AS FONTES:
const roboto = Roboto ({
  subsets:['latin'],
  weight:'100',
  variable:'--font-roboto'
})
const baijamjuree = Baijamjuree ({
  subsets:['latin'],
  weight:'700',
  variable:'--font-bai-jamjuree'
})






export const metadata = {
  title: 'Page',
  description: 'Generated by create next app',
}



export default function RootLayout({children}: {children:ReactNode}) {
  return (
    <html lang="en">
      
      <body className={`${roboto.variable} ${baijamjuree.variable} font-sans`}>
        <h1>layout raiz</h1>
        {children}
      </body>
    
    </html>
  )
}
