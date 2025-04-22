const mood = require("../models/moodModel")
const io = require('socket.io-client')
const socket = io('http://localhost:3000')


class authMood {
    create_mood = async (req, res) => {
            try{
                const result = await mood.create({
                    userID: req.body.userID,
                    title: req.body.title,
                    blank: req.body.blank,
                    elements: req.body.moods,
                    lock: req.body.lock
                });
                const lists=await mood.find({userID: req.body.userID})
                res.json(lists)
            }
            catch(e){
                res.json("fail")
            }
        
        };
    
    

    delete_mood = async (req, res) => {
            try{
                const result=await mood.deleteOne({_id: req.body.id})
                const lists=await mood.find({userID: req.body.userID})
                if(lists){
                    res.json(lists)
                }
            }
            catch(e){
                res.json("fail")
            }
        
        };

    update_mood = async (req, res) => {
            try{
                const result=await mood.findByIdAndUpdate(req.body.id, {
                    userID: req.body.userID,
                    title: req.body.title,
                    blank: req.body.blank,
                    elements: req.body.moods,
                    lock: req.body.lock
                })
                res.json(result)
            }
            catch(e){
                res.json("fail")
            }
        
        };
    
    load_mood = async (req, res) => {
            try{
                const result=await mood.findOne({_id: req.body.moodID})
                res.json(result)
            }
            catch(e){
                res.json("fail")
            }
        
        };

    load_mood_lists = async (req, res) => {
            try{
                const result=await mood.find({userID: req.body.userID})
                res.json(result)
            }
            catch(e){
                res.json("fail")
            }
        
        };
        
        
}

module.exports = new authMood()