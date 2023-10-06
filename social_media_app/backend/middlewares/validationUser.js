const {Users} = require("../models/userModel");
module.exports = {
   isUserExists :  async function (req,res,next){
    const {email} = req.body;
    try{
        const isExists = await Users.findOne({email:email})
        if(isExists){
            return res.status(400).json({ message: 'Email already exists' });
        }else{
            next()
        }

    }catch(error){
        console.log(error)
        res.status(500).send({message:"internal server error"})
    }
},
validateUser:  async function(req,res,next){
    const{name,username,email,password} = req.body;
   if(name.length >3 && username.length>=6 && email.includes('.') && email.includes('@') && password.length>=6 &&  password.length<=12){
        
        next();
    }else{
        res.status(400).send({"message":"invalid input"})
    }
}
}

