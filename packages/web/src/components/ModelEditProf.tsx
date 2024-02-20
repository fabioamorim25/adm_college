import React from "react";
import Model from "react-modal";
import { X } from 'lucide-react';

import FormEditProf from "./FormEditProf";
import FormEditAssociationProfSubject from "./FormEditAssociationProfSubject";


interface IFormProps {
  prof: { profId: string, profName: string };
  model: { open: boolean, modelId: number | null };
  onClose: (event?: React.SyntheticEvent) => void;
}



Model.setAppElement('main');

export default function ModelEditProf({ prof, model, onClose }: IFormProps) {


  return (
    < main>
      <Model isOpen={model.open} onRequestClose={event => onClose(event)}
        className="max-w-screen-xl mx-auto my-20  rounded-md p-9 bg-gray-800">

        <div className="text-white-50 hover:text-purple-400 flex justify-end">
          <button onClick={event => onClose(event)}>
            <X />
          </button>
        </div>

        {/*------------ Dados do professor--------------------------------- */}
        {model.modelId === 1 && (
          <FormEditProf profId={prof.profId} />
        )}

        {/*------------ Matérias associadas ao professor------------------- */}
        {model.modelId === 2 && (
          <FormEditAssociationProfSubject />
        )}
      </Model>
    </main>
  )
}