import { 
    create,
    subjectPorf
} from "../controller/prof.Controller";

import { signIn } from "../controller/auth.controller";
import authTokenValidate from "../middlewares/auth.tokenValidate";

const profRoutes = app=>{

    app.post('/SignIn',signIn);

    app.use(authTokenValidate)
        app.post('/prof/register', create)
        app.post('/assignSubjectProf',subjectPorf)



    
    
}

export default profRoutes;