import {
    create,
    subjectMandatory 
} from "../controller/subject.Controller";

import authTokenValidate from "../middlewares/auth.tokenValidate";


const subjectRoutes = app=>{

    app.use(authTokenValidate)
        app.post('/subject/register', create)
        app.post('/mandatory_Subject',subjectMandatory)
  




    
}

export default subjectRoutes;