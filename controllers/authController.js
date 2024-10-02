const user = require("../models/userModel")

class authController {

    user_login = async (req, res) => {
        
            try{
                const check=await user.findOne({email:req.body.email})
                const pass=await user.findOne({email:req.body.email, password:req.body.password})

                if(pass){
                    res.json(pass)
                }
                else{
                    if(check){
                        res.json("wrongpass")
                    } else {
                        res.json("notexist")
                    }
                }
        
            }
            catch(e){
                res.json("fail")
            }
        
        }
            
        
}

module.exports = new authController()