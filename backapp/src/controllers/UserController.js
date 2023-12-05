const UserModel = require("../models/UserModel");

module.exports = {
    logar: async (req, res)=>{
        let json = {error:'', result:{}};
    
        let email = req.body.email;
        let senha = req.body.senha;
    
        if(email && senha){
            let user = await UserModel.findUser(email, senha);
            if (user){
                json.result = user;
            }             
        }else{
            json.error = "Campos em branco!";
        }
    
        res.json(json);
    }
   
}
