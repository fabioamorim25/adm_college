import { create } from "../controller/prof.Controller";

const profRoutes = app=>{
    app.post('/prof/register', create)





    
}

export default profRoutes;