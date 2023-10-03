'use client'

import { useState } from 'react';
import Link from 'next/link';

interface MenuItem {
  title: string;
  route: string;
}

interface SidebarButtonProps {
  item: MenuItem;
  children?: MenuItem[];
}

export default function SidebarButton({ item, children }: SidebarButtonProps) {

  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="w-full text-left bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-5 rounded">
        {item.title}
      </button>
      {isOpen && (
        <div className="flex flex-col pl-4 bg-gray-700">
          {children?.map((childItem) => (
            <Link key={childItem.route} href={childItem.route} className='p-1 mt-2'>
              {childItem.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


