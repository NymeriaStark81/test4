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
    blank: {
        type: String,
        required: true
    },
    elements: {
        type: Array,
        required: true
    },
    lock: {
        type: Boolean,
        required: true
    }
})

module.exports = model('mood_lists', template_schema)