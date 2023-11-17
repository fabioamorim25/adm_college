import SidebarButton from './ui/SidebarButton';


export default function SidebarAdmin() {

  return (
    <div className=" h-screen w-72 bg-gray-700 text-white-50 p-5">
      <nav>
        <SidebarButton
          item={{ title: 'Registros', route: '/menu' }}
          children={[
            { title: 'Registra Cursos', route: '/admin/registerCourses' },
            { title: 'Registra Matérias', route: '/admin/registerSubjects' },
            { title: 'Registra Professores', route: '/admin/registerProfs' },
            { title: 'Registra Aluno', route: '/admin/registerStudents' },
            // Adicione mais itens
          ]}
        />

        <SidebarButton
          item={{ title: 'Editar', route: '/menu' }}
          children={[
            { title: 'Ação 6', route: '#' },
            { title: 'Ação 7', route: '#' },
            // Adicione mais itens de submenu conforme necessário
          ]}
        />


        {/*Adicione mais botões SidebarButton conforme necessário */}
      </nav>
    </div>
  );
};