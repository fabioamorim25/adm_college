

declare module 'admin' {
  type SetStateAction<S> = S | ((prevState: S) => S);

  interface ContextAdminProps {
    subjectName: string | null;
    setSubjectName: React.Dispatch<SetStateAction<string | null>>

    courseName:string | null
    setCourseName:React.Dispatch<SetStateAction<string | null>>
  }
  
}

