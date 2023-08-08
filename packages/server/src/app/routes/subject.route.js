import { create, subjectMandatory } from "../controller/subject.Controller";

const subjectRoutes = app=>{
    app.post('/subject/register', create)


    app.post('/mandatory_Subject',subjectMandatory)
  




    
}

export default subjectRoutes;