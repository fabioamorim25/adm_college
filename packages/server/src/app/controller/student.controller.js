import bcrypt from 'bcryptjs'
import { createStudents } from "../repository/student.Repository";
import { studentValidation } from '../validations/student.validation';


export const create = async(req,res)=>{
   
    let {stu_name,stu_registration,stu_course, stu_status,stu_period,stu_mother_name,stu_father_name,stu_phone,stu_email,stu_password,courseId}= req.body
    
    try {
        //1° VALIDAR OS DADOS RECEBIDOS
        await studentValidation.validate(req.body)
        //2° CRIPTOGRAFAR A SENHA
        const hashPassword = await bcrypt.hash(stu_password,10);
        stu_password = hashPassword;
    
        //3° MANDAR CRIAR O STUDENT
        const student = await createStudents(
            stu_name,
            stu_registration,
            stu_course,
            stu_status,
            stu_period,
            stu_mother_name,
            stu_father_name,
            stu_phone,
            stu_email,
            stu_password,
            courseId
        )
        
        return res.status(201).json(student)
    
    } catch (error) {
        return res.status(404).json(error)
    }
}