import { signIn } from "../controller/auth.controller";
import { create } from "../controller/student.controller";

import authTokenValidate from "../middlewares/auth.tokenValidate";

const studentRoutes = app=>{
    
    app.post('/SignIn',signIn);
    
    app.use(authTokenValidate)
        app.post('/student/register', create)

    
}

export default studentRoutes;