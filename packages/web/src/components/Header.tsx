import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/options'
import Profile from './ui/Profile';

type SidebarAdminProps = {
  className?: string;
};

export default async function Header({ className }: SidebarAdminProps) {

  const session = await getServerSession(nextAuthOptions)

  return (
    <header className="flex justify-between items-center p-6 bg-gray-900 text-white-50">

      <div className='font-bold'>Centro Tecnologia do Futuro</div>

      <div className="flex items-center">
        {session && (
          <>
            <span className="mr-4">Olá, {session.user.dep_name}</span>
            <Profile />
          </>
        )}
      </div>

    </header>
  )
}