import React from "react";
import { Search } from 'lucide-react';

interface SearchProps {
  placeholder: string;
  onSearchChange: (value: string) => void;
}


export default function Searcher({ placeholder, onSearchChange }: SearchProps) {

  // PEGAR O NOME E PASSAR PARA O PAI
  function handleNameSearch(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    onSearchChange(e.target.value);
  }


  return (
    <>

      {/* BARRA DE PESQUISA*/}
      <div className="flex min-w-full p-4">
        <div className="relative inline-flex items-center">
          <input
            type="text"
            name="name"
            onChange={handleNameSearch}
            placeholder={placeholder}
            className="w-96 px-3 py-1 text-gray-700 bg-white border rounded-md focus:border-purple-900 focus:ring-purple-600
            focus:outline-none focus:ring focus:ring-opacity-40 pr-10"
          />

          {/* icone */}
          <div className="absolute right-0 p-3">
            <Search strokeWidth={0.75} size={20} />
          </div>

        </div>
      </div>

    </>
  )
}