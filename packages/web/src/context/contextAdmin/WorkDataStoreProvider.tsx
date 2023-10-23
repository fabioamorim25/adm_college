'use client'


import {createContext, useContext, useState} from 'react'
import { ContextAdminProps } from 'admin'



// 1°CRIAR O CONTEXTO GLOBAL
const WorkDataContext = createContext<ContextAdminProps>({
  // estado inicial dos dados
  subjectName: null,
  setSubjectName: null
})

// 2°CRIAR O PROVEDOR DO CONTEXTO
export function WorkDataContextPorvider({children}:any){
  // criar a variavel do dado
  const [subjectName, setSubjectName] = useState(null)

  // passar os dados que o provedor pode passar para os componentes
  return(
    <WorkDataContext.Provider value={{subjectName, setSubjectName}}>
      {children}
    </WorkDataContext.Provider>
  )
}

// 3°CONSEGUIR USAR O CONTEXTO NOS COMPONENTES
export function useWorkDataContext(){
  return useContext(WorkDataContext)
}