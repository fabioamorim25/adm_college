'use client'
import { useState, useEffect } from 'react';
import { FiX } from "react-icons/fi";


// tipar os dados vindos do componente pai
interface ItoastProps {
  errorMessage: string | null;
}

// MICRO-COMPONENTE: MOSTAR MENSAGEM DE ERRO NA TELA
export default function Toast({ errorMessage }: ItoastProps) {//receber a mensagem do componente pai

  //1°pegar o estado do botão (começa como falso)
  const [showToast, setShowToast] = useState(false);

  //2° ficar Verificando se tem mensagem
  useEffect(() => {
    if (errorMessage) {
      setShowToast(true);
    }
  }, [errorMessage]);

  //1.2:funcionalidade do botão (fecha)
  const handleClose = () => {
    setShowToast(false);
  };

  //tirar todo o componente da tela  
  if (!showToast) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 bg-black-400 text-gray-100 p-2 rounded-md flex justify-between items-center">
    <p>{errorMessage}</p>
    <button className="bg-white text-black px-2 py-1 rounded-md" onClick={handleClose}>
      <FiX/>
    </button>
  </div>
  );
}

