const { model, Schema } = require('mongoose')

const template_schema = new Schema({
    //to be changed to user ID later
    userID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    layout: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
    },
    temp_type: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    elements: {
        type: Array,
        required: true
    }
})

module.exports = model('templates', template_schema)