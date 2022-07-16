const mongoose = require('mongoose')
const Schema = mongoose.Schema

const unitSchema = new Schema({
    unit_name: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
}, { timestamps: true })

const Unit = mongoose.model('Unit', unitSchema)
module.exports = Unit