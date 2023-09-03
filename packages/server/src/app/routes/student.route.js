import { signIn } from "../controller/auth.controller";
import { create } from "../controller/student.controller";

const studentRoutes = app=>{
    app.post('/student/register', create)


    app.post('/SignIn',signIn);


    
}

export default studentRoutes;