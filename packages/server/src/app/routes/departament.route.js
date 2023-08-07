import { create, subjectMandatory } from "../controller/departament.controller";

const departamentRoutes = app=>{
    app.post('/department/register', create)
    
    
    
    
    
    app.post('/mandatory_Subject',subjectMandatory)

    
}

export default departamentRoutes;