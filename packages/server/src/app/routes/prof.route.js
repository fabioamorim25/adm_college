import { 
    create,
    subjectPorf
} from "../controller/prof.Controller";


const profRoutes = app=>{
    app.post('/prof/register', create)

    app.post('/assignSubjectProf',subjectPorf)





    
}

export default profRoutes;