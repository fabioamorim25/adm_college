const {Departament} = require('../../models')


const Register = async(req,res)=>{

    const {dep_name, dep_email, dep_password} = req.body;

    try {
        
        if(await Departament.findByPk(dep_email || dep_name)){
            return res.status(400).json('O departamento já existe')
        }


        const departament = await Departament.create({dep_name, dep_email, dep_password})
        res.send(departament)
      

    } catch (error) {
        return res.status(400).send({error: 'Falha ao registar o departamento'})
    }

}



export default {Register}
