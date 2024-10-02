const habit = require("../models/habitModel")


class authCreateHabit {
    create_habit = async (req, res) => {
            try{
                const result = await habit.create({
                    userID: req.body.userID,
                    title: req.body.habitTitle,
                    status: 'working',
                    input: '',
                    output: '',
                    elements: []
                });
                res.json(result)
            }
            catch(e){
                res.json("fail")
            }
        
        };

    update_habit = async (req, res) => {
            try{
                const result=await habit.findByIdAndUpdate(req.body.habitID, {
                    elements: req.body.elements
                })
            }
            catch(e){
                res.json("fail")
            }
        
        };
    
    load_habit = async (req, res) => {
            try{
                const result=await habit.findOne({_id: req.body.habitID})
                console.log(result.elements)
                res.json(result.elements)
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

module.exports = new authCreateHabit()