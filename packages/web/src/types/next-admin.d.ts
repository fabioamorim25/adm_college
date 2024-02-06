

declare module 'admin' {
  type SetStateAction<S> = S | ((prevState: S) => S);

  interface ContextAdminProps {
    subjectName: string | null;
    setSubjectName: React.Dispatch<SetStateAction<string | null>>

    courseName: string[] | null | undefined; 
    setCourseName: React.Dispatch<SetStateAction<string | string[] | null | undefined>>;


    profName: string | null
    setProfName: React.Dispatch<SetStateAction<string | null>>

    studentName: string | null
    setStudentName: React.Dispatch<SetStateAction<string | null>>
  }
  // TIPAGEM DOS DADOS TABALHADOS PELO ADMIN
  interface ICourses {
    id: string;
    cou_name: string;
    amount: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
  }
  interface IStudent {
    stu_name: string
    stu_registration: string
    stu_status: string
    stu_period: string
    stu_mother_name: string
    stu_father_name: string
    stu_phone: string
    email: string
    password: string
    courseName: string
  }
  interface IAddress {
    add_street: string,
    add_city: string,
    add_neighborhood: string,
    add_number: string,
    add_complement: string,
    studentName: string | null,
  }
  interface ISubjects {
    id: string;
    sub_name: string;
    sub_description: string;
    sub_shift: string;
    amount: string;
    sub_start_time: string;
    sub_stop_time: string;
    sub_mandatory: string;
    sub_day: string;
    status: boolean;
    updatedAt: string;
  }
  interface Iprof {
    profName: string | null
    subject: string[] | null;
  }
  interface IProfs {
    prof_name: string
    email: string
    password: string
    prof_phone: string
    prof_status: string
  }
  interface ISubjectCourse {
    subjectName: string;
    courseName: string[];
    association: IAssociationProps[];
  }
  interface IAssociationProps {
    id: string;
    course: {
      id: string;
      cou_name: string;
    }
  }
  interface IRequisite {
    preRequisite: string
    subjectName: any
  }

  // TIPAGEM DOS COMPONENTES
  interface Imessage {
    message: string
    type: string
  }
}

