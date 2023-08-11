import {
    create,
    edite
} from "../controller/departament.controller";

const departamentRoutes = app=>{
    app.post('/department/register', create)
    app.put('/editDepartament/:id', edite)
    
    
    
    
    

    
}

export default departamentRoutes;