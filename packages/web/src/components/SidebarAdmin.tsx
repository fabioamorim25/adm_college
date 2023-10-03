import SidebarButton from './ui/SidebarButton';

export default function SidebarAdmin() {

  return (
    <div className="fixed top-0 left-0 h-screen w-80 bg-gray-200 text-white-50 p-5">
      <h1 className="text-2xl mb-3">Menu Lateral</h1>
      <nav>
        <SidebarButton
          item={{ title: 'Registros', route: '/menu' }}
          children={[
            { title: 'Ação 1', route: '#' },
            { title: 'Ação 2', route: '#' },
            // Adicione mais itens
          ]}       
        />
        
        <SidebarButton
          item={{ title: 'Editar', route: '/menu' }}
          children={[
            { title: 'Ação 3', route: '#' },
            { title: 'Ação 4', route: '#' },
            // Adicione mais itens de submenu conforme necessário
          ]}       
        />


        {/*Adicione mais botões SidebarButton conforme necessário */}
      </nav>
    </div>
  );
};