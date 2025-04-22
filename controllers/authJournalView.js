const journal = require("../models/journalModel")
const fetch = require("node-fetch")

class authJournalView {

    load_journal = async (req, res) => {
        
        try{
            const journals=await journal.findOne({_id: req.body.journalID})
            if(journals){
                const pagesb = await fetch(journals.pages[0])
                const pages = await pagesb.json()
                res.json({journal: journals, prevURL: journals.pages[0], pages: pages})
            }
        }
        catch(e){
            res.json("fail")
        }
    
    };

    find_recent = async (req, res) => {
        
        try{
            const journals=await journal.findOne({_id: req.body.journalID})
            if(journals){
                res.json('found')
            } else {
                res.json('not found')
            }
        }
        catch(e){
            res.json("fail")
        }
    
    };

    update_view = async (journalID, pages) => {
        try{
            const result=await journal.findByIdAndUpdate(journalID, {
                pages: pages
            })
        }
        catch(e){
            res.json("fail")
        }
    }

    check_thumbnail = async (req, res) => {
            
                try{
                    console.log('server 1')
                    const result=await journal.findOne({_id:req.body.journalID})
                    console.log(result.thumbnail)
                    res.json(result.thumbnail)
                }
                catch(e){
                    res.json("fail")
                }
            
            };
    
    update_thumbnail = async (req, res) => {
    
        try{
            console.log('server last')
            const result=await journal.findByIdAndUpdate(req.body.journalID, {
                thumbnail: req.body.thumbnail
            })
        }
        catch(e){
            res.json("fail")
        }
    
    };

       
        
}

module.exports = new authJournalView()