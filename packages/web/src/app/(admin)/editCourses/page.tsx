import Link from 'next/link'
import { Home } from 'lucide-react'
import AreaCourse from '@/components/AreaCourses'



export default function EditCourses() {
  return (
    <>
      <main>
        {/* NAVEGAÇÃO PARA HOME */}
        <nav className="flex flex-col items-start p-3">
          <div className="flex space-x-2 text-lg font-bold pb-0">
            <Link href='/home'>
              <Home size={22} />
            </Link>
            <span>/ Editar Dados</span>
          </div>
          <hr className="w-full mt-2 border-t-4 border-purple-700" />
        </nav>


        {/* LISTA DE CURSOS */}
        <AreaCourse/>



      </main>
    </>
  )
}