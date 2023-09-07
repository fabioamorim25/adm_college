import { 
    create,
    subjectPorf
} from "../controller/prof.Controller";

import authTokenValidate from "../middlewares/auth.tokenValidate";
import { roleAdmin } from "../middlewares/roleAccessControl";

const profRoutes = app=>{

    
        app.post('/prof/register', authTokenValidate,roleAdmin, create)
        app.post('/assignSubjectProf', authTokenValidate,roleAdmin, subjectPorf)



    
        
}

export default profRoutes;