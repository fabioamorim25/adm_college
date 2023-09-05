import { 
    create, 
    edite 
} from "../controller/note.Controller";


import authTokenValidate from "../middlewares/auth.tokenValidate";
import { roleTeacher } from "../middlewares/roleAccessControl";

const noteRoutes = app=>{

    app.use(authTokenValidate)
    app.use(roleTeacher)
        app.post('/createNotes', create)
        app.put('/editNotes', edite)
    




    
}

export default noteRoutes;