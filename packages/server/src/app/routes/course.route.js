import { create } from "../controller/course.Controller";

const courseRoutes = app=>{
    app.post('/course/register', create)





    
}

export default courseRoutes;