const template = require("../models/templateModel")
const fetch = require("node-fetch")
const sharp = require("sharp")
//const request = require('request')

class authTemplate {

    load_template = async (req, res) => {
        
        try{
            const templates=await template.find({userID: req.body.userID})
            if(templates){
                res.json(templates)
            }
        }
        catch(e){
            res.json("fail")
        }
    
    };

    delete_template = async(req, res) => {
        try{
            const update=await template.deleteOne({_id: req.body.id})
            const templates=await template.find({userID: req.body.userID})
            if(templates){
                res.json(templates)
            }
        }
        catch(e){
            res.json("fail")
        }
    }

    create_template = async (req, res) => {
            try{
                const result = await template.create({
                    userID: req.body.userID,
                    title: req.body.title,
                    layout: req.body.layout,
                    temp_type: req.body.temp_type,
                    thumbnail: '',
                    order: 0,
                    elements: []
                });
                res.json(result)
            }
            catch(e){
                res.json("fail")
            }
        
        };

    duplicate_template = async (req, res) => {
        try{
            const result = await template.create({
                userID: req.body.duplicate.userID,
                title: req.body.title,
                layout: req.body.duplicate.layout,
                temp_type: req.body.duplicate.temp_type,
                thumbnail: req.body.duplicate.thumbnail,
                order: req.body.duplicate.order,
                elements: req.body.duplicate.elements
            });
            const templates=await template.find({userID: req.body.duplicate.userID})
            if(templates){
                res.json(templates)
            }
        }
        catch(e){
            res.json("fail")
        }
    }

    initialize = async (req, res) => {
    
        try{
            const result=await template.findOne({_id:req.body.tempID})
            res.json(result)
        }
        catch(e){
            res.json("fail")
        }
    
    };

    update_canvas = async (msg) => {
    
        try{
            const result=await template.findByIdAndUpdate(msg. tempID, {
                elements: msg.squares
            })
        }
        catch(e){
            res.json("fail")
        }
    
    };

    check_thumbnail = async (req, res) => {
    
        try{
            console.log('server 1')
            const result=await template.findOne({_id:req.body.tempID})
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
            const result=await template.findByIdAndUpdate(req.body.tempID, {
                thumbnail: req.body.thumbnail
            })
        }
        catch(e){
            res.json("fail")
        }
    
    };

    request_buffer = async(req, res) => {
        try{
            let fimg = await fetch(req.body.url)
            let fimgb = Buffer.from(await fimg.arrayBuffer())
            const image = sharp(fimgb);
            image.metadata()
            .then((metadata) => {
                // perform your calculations based on metadata.width and metadata.height
                const left = req.body.cropTransform.left, top = req.body.cropTransform.top, width = req.body.cropTransform.width, height = req.body.cropTransform.height;
                return image
                .extract({ left, top, width, height })
                .toBuffer();
            })
            .then((metadata) => {
                res.json(metadata)
            })
        }
        catch(e){
            res.json("fail")
        }
    }

        
        
}

module.exports = new authTemplate()