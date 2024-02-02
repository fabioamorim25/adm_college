import React from "react";
import Model from "react-modal";
import { X } from 'lucide-react';

import FormEditSubject from "./FormEditSubject";
import FormEditMandatorySubject from "./FormEditMandatorySubject";
import FormEditAssociationSubjectCourse from "./FormEditAssociationSubjectCourse";



interface IFormProps {
  subject: { subjectId: string, name: string };
  model: { open: boolean, modelId: number | null };
  onClose: (event?: React.SyntheticEvent) => void;
}


Model.setAppElement('main');

export default function ModelFormEditSubject({ subject, model, onClose }: IFormProps) {

  return (
    <main>

      <Model
        isOpen={model.open} onRequestClose={(event) => onClose(event)}
        className="max-w-screen-xl mx-auto my-20  rounded-md p-9 bg-gray-800">

        <div className="text-white-50 hover:text-purple-400 flex justify-end">
          <button onClick={(event) => onClose(event)}>
            <X />
          </button>
        </div>
        {/*------------ Dados da matéria------------------------------------------------- */}
        {model.modelId === 1 && (
          <FormEditSubject subjectId={subject.subjectId} />
        )
        }
        {/* ----------- Associação com um curso ----------------------------------------- */}
        {model.modelId === 2 && (
          <FormEditAssociationSubjectCourse subject={subject} />
        )
        }
        {/* ----------- Obrigatoriedade com outra matéria ------------------------------- */}
        {model.modelId === 3 && (
          <FormEditMandatorySubject />
        )
        }

      </Model>

    </main>
  )
}
