import { 
    create,
    subjectPorf
} from "../controller/prof.Controller";

import authTokenValidate from "../middlewares/auth.tokenValidate";

const profRoutes = app=>{

    

    app.use(authTokenValidate)
        app.post('/prof/register', create)
        app.post('/assignSubjectProf',subjectPorf)



    
        
}

export default profRoutes;