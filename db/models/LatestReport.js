const mongoose = require('mongoose')
const Schema = mongoose.Schema

const latestReportSchema = new Schema({
    fort_id: {
        type: Schema.ObjectId,
        required: true
    },
    report_id: {
        type: Schema.ObjectId,
        ref: 'Report',
        required: true
    }
}, { timestamps: true })

const LatestReport = mongoose.model('LatestReport', latestReportSchema)
module.exports = LatestReport