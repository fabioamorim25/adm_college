'use client'


import {createContext, useContext, useState} from 'react'
import { ContextAdminProps } from 'admin'



// 1°CRIAR O CONTEXTO GLOBAL
const WorkDataContext = createContext<ContextAdminProps>({
  // estado inicial dos dados
  subjectName: null,
  setSubjectName: () => {},

  courseName: null,
  setCourseName: () => {},

  profName:null,
  setProfName:()=>{},
})

// 2°CRIAR O PROVEDOR DO CONTEXTO
export function WorkDataContextPorvider({children}:any){
  // criar a variavel do dado
  const [subjectName, setSubjectName] = useState<string | null>(null)
  const [courseName,setCourseName] = useState<string | null>(null)
  const [profName, setProfName] = useState<string| null>(null)
  
  return(
    <WorkDataContext.Provider value={{subjectName,setSubjectName, courseName,setCourseName, profName,setProfName}}>
      {children}
    </WorkDataContext.Provider>
  )
}

// 3°CONSEGUIR USAR O CONTEXTO NOS COMPONENTES
export function useWorkDataContext(){
  return useContext(WorkDataContext)
}