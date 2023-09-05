import { 
    create,
    subjectPorf
} from "../controller/prof.Controller";

import authTokenValidate from "../middlewares/auth.tokenValidate";
import { roleAdmin } from "../middlewares/roleAccessControl";

const profRoutes = app=>{

    

    app.use(authTokenValidate)
    app.use(roleAdmin)
        app.post('/prof/register', create)
        app.post('/assignSubjectProf',subjectPorf)



    
        
}

export default profRoutes;