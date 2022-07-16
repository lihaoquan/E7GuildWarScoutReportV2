const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
    enemyGuild: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    author: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    forts: [{
        player_name: String,
        author: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        name: {
            type: String,
            required: true
        },
        fort_type: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            }
        },
        reports: [{
            type: Schema.ObjectId,
            ref: 'Report'
        }]
    }]
}, { timestamps: true })

const Record = mongoose.model('Record', recordSchema)
module.exports = Record