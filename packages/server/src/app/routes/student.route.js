import { create } from "../controller/student.controller";

const studentRoutes = app=>{
    app.post('/student/register', create)





    
}

export default studentRoutes;