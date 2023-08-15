import { 
    create, 
    edite 
} from "../controller/note.Controller";

const noteRoutes = app=>{
    app.post('/createNotes', create)
    app.put('/editNotes', edite)
    




    
}

export default noteRoutes;