import { create } from "../controller/note.Controller";

const noteRoutes = app=>{
    app.post('/createNotes', create)
    




    
}

export default noteRoutes;