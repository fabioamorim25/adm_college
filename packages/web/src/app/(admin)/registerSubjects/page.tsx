import Link from 'next/link'
import { Home } from 'lucide-react';
import FormRegisterSubject from '@/components/FormRegisterSubject';
import FormAssociationSubjectCourse from '@/components/FormAssociationSubjectCourse';
import { FormMandatorySubject } from '@/components/FormMandatorySubject';





export default async function AddSubjects() {

  return (
    <main>
      {/* NAVEGAÇÃO PARA HOME */}
      <nav className="flex flex-col items-start p-3">
        <div className="flex space-x-2 text-lg font-bold pb-0">
          <Link href='/home'>
            <Home size={22} />
          </Link>
          <span>/ Dados Cadastrais</span>
        </div>
        <hr className="w-full mt-2 border-t-4 border-purple-700" />
      </nav> 

     {/*funcionalidade registra máteria*/}
      <FormRegisterSubject/>
     
      {/* associar a máteria a um curso */}
     <FormAssociationSubjectCourse/>

      {/*funcionalidade obrigatóriedade da máteria*/}
      <FormMandatorySubject/>

    </main>
  )
}