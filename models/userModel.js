const { model, Schema } = require('mongoose')

const user_schema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
})

module.exports = model('collection', user_schema)