import { 
    create, 
    edite 
} from "../controller/note.Controller";


import authTokenValidate from "../middlewares/auth.tokenValidate";

const noteRoutes = app=>{

    app.use(authTokenValidate)
        app.post('/createNotes', create)
        app.put('/editNotes', edite)
    




    
}

export default noteRoutes;