const mongoose = require('mongoose')
const Schema = mongoose.Schema

const announcementSchema = new Schema({
    author: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Announcement = mongoose.model('Announcement', announcementSchema)
module.exports = Announcement