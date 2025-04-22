const { model, Schema } = require('mongoose')

const template_schema = new Schema({
    //to be changed to user ID later
    userID: {
        type: String,
        required: true
    },
    journal_title: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    pages: {
        type: Array,
        required: true
    },
    bmDaily: {
        type: Array,
        required: true
    },
    bmWeek: {
        type: Array,
        required: true
    },
    bmMonth: {
        type: Array,
        required: true
    },
    bmYear: {
        type: Array,
        required: true
    },
    tagMonth: {
        type: Array,
        required: true
    },
    thumbnail: {
        type: String
    }
})

module.exports = model('journal', template_schema)