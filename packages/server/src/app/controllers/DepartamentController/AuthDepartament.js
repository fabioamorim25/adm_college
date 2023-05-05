
import { Departaments } from '../../models/';



const Register = async(req,res)=>{

    const {name,email,password} = req.body;

    try {
    


        //const departament = await Departaments.create({name,email,password});
        //return res.json({departament})

       




    } catch (error) {
        return res.status(400).send(error)
        //return res.status(400).send({error: 'Falha ao registar o departamento'})
    }

}



export default {Register}
