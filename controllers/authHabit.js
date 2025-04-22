const habit = require("../models/habitModel")


class authHabit {
    create_habit = async (req, res) => {
            try{
                const result = await habit.create({
                    userID: req.body.userID,
                    title: req.body.habitTitle,
                    lock: false,
                    elements: req.body.habits
                });
                res.json(result)
            }
            catch(e){
                res.json("fail")
            }
        
        };

    delete_habit = async (req, res) => {
            try{
                const result=await habit.deleteOne({_id: req.body.id})
                const lists=await habit.find({userID: req.body.userID})
                if(lists){
                    res.json(lists)
                }
            }
            catch(e){
                res.json("fail")
            }
        
        };

    update_habit = async (req, res) => {
            try{
                const result=await habit.findByIdAndUpdate(req.body.habitID, {
                    title: req.body.title,
                    elements: req.body.elements,
                    lock: req.body.lock
                })
            }
            catch(e){
                res.json("fail")
            }
        
        };
    
    load_habit = async (req, res) => {
            try{
                const result=await habit.findOne({_id: req.body.habitID})
                res.json(result)
            }
            catch(e){
                res.json("fail")
            }
        
        };

    load_habit_lists = async (req, res) => {
            try{
                const result=await habit.find({userID: req.body.userID})
                res.json(result)
            }
            catch(e){
                res.json("fail")
            }
        
        };
        
        
}

module.exports = new authHabit()