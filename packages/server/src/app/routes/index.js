import departamentRoutes from "./departament.route";
import courseRoutes from "./course.route";
import profRoutes from "./prof.route";
import subjectRoutes from "./subject.route";


const routes = (app)=>{
    departamentRoutes(app)
    courseRoutes(app)
    profRoutes(app)
    subjectRoutes(app)
}

export default routes;