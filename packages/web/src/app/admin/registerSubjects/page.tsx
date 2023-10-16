import Link from 'next/link'
import { Home } from 'lucide-react';
import FormRegisterSubject from '@/components/FormRegisterSubject';
import FormAssociationSubjectCourse from '@/components/FormAssociationSubjectCourse';




export default async function AddSubjects() {

  return (
    <main>
      {/* NAVEGAÇÃO PARA HOME */}
      <nav className="flex flex-col items-start p-3">
        <div className="flex space-x-2 text-lg font-bold pb-0">
          <Link href='/admin/home'>
            <Home size={22} />
          </Link>
          <span>/ Dados Cadastrais</span>
        </div>
        <hr className="w-full mt-2 border-t-4 border-purple-700" />
      </nav> 

     {/*funcionalidade registra materia*/}
      <FormRegisterSubject/>
     
      {/* associar a materia a um curso */}
      <FormAssociationSubjectCourse/>

      <h3>funcionalidade obrigatóriedade da materia</h3>


    </main>
  )
}