import departamentRoutes from "./departament.route";
import courseRoutes from "./course.route";
import profRoutes from "./prof.route";
import subjectRoutes from "./subject.route";
import studentRoutes from "./student.route";
import addressRoutes from "./address.route";
import noteRoutes from "./note.route";
import authRoutes from "./auth.route";


const routes = (app) => {
    authRoutes(app);
    departamentRoutes(app);
    courseRoutes(app);
    profRoutes(app);
    subjectRoutes(app);
    studentRoutes(app);
    addressRoutes(app);
    noteRoutes(app);
   

}

export default routes;
