import departamentRoutes from "./departament.route";
import courseRoutes from "./course.route";


const routes = (app)=>{
    departamentRoutes(app)
    courseRoutes(app)
}

export default routes;