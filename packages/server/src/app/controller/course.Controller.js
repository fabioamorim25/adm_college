import { createCourses, getCourse } from "../repository/course.Repository";
import { courseUnic } from "../validations/course.validation";

// CRIAR UM DOCUMENTO DO CURSO
export const create = async(req,res)=>{
   
    let {cou_name,departamentId}= req.body
      
    // VALIDAR O NOME DO CURSO (Deve ser unico)
    const nameUnique = await courseUnic(cou_name)
    if (nameUnique)
        return res.status(400).json({ message: nameUnique.message, type:nameUnique.type })
        
    try {
        //MANDAR CRIAR O DEPARTAMENTO
        const course = await createCourses(
            cou_name,
            departamentId
        )
        
        return res.status(201).json(course)
    
    } catch (error) {
        return res.status(404).json(error)
    }
}


// LISTAR TODOS OS NOMES DE CURSOS DO SISTEMA
export const getAllCourse = async(req,res)=>{
    try {
        const list = await getCourse()
        return res.status(201).json(list)
    } catch (error) {
        return res.status(404).json(error)
    }
}