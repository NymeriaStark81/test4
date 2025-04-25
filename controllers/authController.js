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
    
    user_signup = async (req, res) => {
        
            try{
                const check=await user.findOne({email:req.body.email})

                if(check){
                    res.json('existed')
                } else {
                    const result = await user.create({
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                    })
                    res.json(result)
                }
        
            }
            catch(e){
                res.json("fail")
            }
        
        }
    
    load_user = async (req, res) => {
    
        try{
            const check=await user.findOne({_id:req.body.userID})

            res.json({userID: check._id, userName: check.username, recent: check.recent})
    
        }
        catch(e){
            res.json("fail")
        }
    
    }

    update_recent = async (req, res) => {
    
        try{
            const result=await user.findByIdAndUpdate(req.body.userID, {
                                recent: req.body.journalID
                            })
    
        }
        catch(e){
            res.json("fail")
        }
    
    }
            
        
}

module.exports = new authController()
