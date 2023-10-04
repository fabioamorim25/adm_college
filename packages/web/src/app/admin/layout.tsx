import { ReactNode } from 'react'
import '../../styles/globals.css'
import SidebarAdmin from '@/components/SidebarAdmin'



export const metadata = {
  title: 'PageAdmin',
  description: 'página admin do departamento',
}



export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">

      <body className={``}>
        <SidebarAdmin />
        <h1>layout do admin</h1>
        {children}
      </body>

    </html>
  )
}