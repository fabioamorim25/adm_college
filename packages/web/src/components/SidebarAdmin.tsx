import SidebarButton from './ui/SidebarButton';


export default function SidebarAdmin() {

  return (
    <div className=" h-screen w-72 bg-gray-700 text-white-50 p-5">
      <nav>
        <SidebarButton
          item={{ title: 'Registros', route: '#' }}
          children={[
            { title: 'Registra Cursos', route: '/registerCourses' },
            { title: 'Registra Matérias', route: '/registerSubjects' },
            { title: 'Registra Professores', route: '/registerProfs' },
            { title: 'Registra Aluno', route: '/registerStudents' },
            // Adicione mais itens
          ]}
        />

        <SidebarButton
          item={{ title: 'Editar', route: '#' }}
          children={[
            { title: 'Editar Cursos', route: '/editCourses' },
            { title: 'Editar Matérias', route: '/editSubjects' },
            { title: 'Ação', route: '#' },
            // Adicione mais itens de submenu conforme necessário
          ]}
        />


        {/*Adicione mais botões SidebarButton conforme necessário */}
      </nav>
    </div>
  );
};