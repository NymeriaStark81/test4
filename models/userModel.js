const { model, Schema } = require('mongoose')

const user_schema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    recent: {
        type: String,
        required: true
    }
})

module.exports = model('users', user_schema)