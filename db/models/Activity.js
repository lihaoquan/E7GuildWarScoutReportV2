const mongoose = require('mongoose')
const Schema = mongoose.Schema

const activitySchema = new Schema({
    report_id: {
        type: Schema.ObjectId,
        ref: 'Report',
        required: true
    },
    activities: [{
        user: {
            type: Schema.ObjectId,
            ref: 'User',
            required: true
        },
        activity: [{
            type: String,
            required: true,
        }],
        date: {
            type: Date,
            required: true
        }
    }]
}, { timestamps: true })

const Activity = mongoose.model('Activity', activitySchema)
module.exports = Activity