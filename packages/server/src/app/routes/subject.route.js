import {
    associateSubjectCourse,
    create,
    getAllSubject,
    subjectMandatory 
} from "../controller/subject.Controller";

import authTokenValidate from "../middlewares/auth.tokenValidate";
import { roleAdmin } from "../middlewares/roleAccessControl";


const subjectRoutes = app=>{

    // app.use(authTokenValidate)
    // app.use(roleAdmin)
        app.post('/subject/register',authTokenValidate,roleAdmin, create)
        app.post('/mandatory_Subject',authTokenValidate,roleAdmin,subjectMandatory)
        app.post('/associate_Subject_Course',authTokenValidate,roleAdmin,associateSubjectCourse)
        app.post('/getAllSubject',authTokenValidate,roleAdmin,getAllSubject)



    
}

export default subjectRoutes;