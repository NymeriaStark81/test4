const template = require("../models/templateModel")
const fetch = require("node-fetch")
const sharp = require("sharp")
//const request = require('request')

class authCreateTemplate {

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

    create_template = async (req, res) => {
            try{
                console.log(req.body)
                const result = await template.create({
                    userID: req.body.userID,
                    title: req.body.title,
                    layout: req.body.layout,
                    temp_type: req.body.temp_type,
                    elements: [{
                        type: 'text',
                        id: Date.now(),
                        top: "0",
                        left: "0",
                        z_index: 1,
                        rotate: 'rotate(0deg)',
                        opacity: '100%',
                        fontType: '',
                        fontSize: '',
                        fontColor: 'red',
                        content: 'Text 2'
                    }]
                });
                res.json(result)
            }
            catch(e){
                res.json("fail")
            }
        
        };

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

module.exports = new authCreateTemplate()