const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reportSchema = new Schema({
    author: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    contributors: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    viewers: [{
        type: Schema.ObjectId,
        ref: 'User',
    }],
    date: {
        type: Date,
        required: true
    },
    comments: [{
        author: {
            type: Schema.ObjectId,
            ref: 'User',
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        files: [
            {
                type: String
            }
        ]
    }],
    activities: {
        type: Schema.ObjectId,
        ref: 'Activity',
    },
    unit_data: {
        rounds: [{
            units: [{
                unit: {
                    type: Schema.ObjectId,
                    ref: 'Unit',
                    required: true
                },
                speed: {
                    type: Number,
                    validate: {
                        validator: Number.isInteger,
                        message: '{VALUE} is not an integer value'
                    }
                },
                health: {
                    type: Number,
                    validate: {
                        validator: Number.isInteger,
                        message: '{VALUE} is not an integer value'
                    }
                },
                artifact: {
                    type: Schema.ObjectId,
                    ref: 'Artifact'
                },
                item_set: {
                    type: String
                }
            }]
        }]
    }
}, { timestamps: true })

const Report = mongoose.model('Report', reportSchema)
module.exports = Report