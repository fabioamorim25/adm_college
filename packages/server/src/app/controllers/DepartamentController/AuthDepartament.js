



const AuthDepartament = {
 Register:async( req,res)=>{

    const {name,email,password} = req.body;

    try {
    




       




    } catch (error) {
        return res.status(400).send(error)
        //return res.status(400).send({error: 'Falha ao registar o departamento'})
    }

}

}


export default AuthDepartament;
