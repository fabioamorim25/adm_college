import { 
    create,
    subjectPorf
} from "../controller/prof.Controller";

import { signIn } from "../controller/auth.controller";


const profRoutes = app=>{
    app.post('/prof/register', create)

    app.post('/assignSubjectProf',subjectPorf)



    app.post('/SignIn',signIn);

    
}

export default profRoutes;