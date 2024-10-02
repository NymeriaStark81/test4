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
    status: {
        type: String,
        required: true
    },
    input: {
        type: String
    },
    output: {
        type: String
    },
    elements: {
        type: Array
    }
})

module.exports = model('habit_lists', template_schema)