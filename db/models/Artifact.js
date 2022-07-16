const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artifactSchema = new Schema({
    artifact_name: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
}, { timestamps: true })

const Artifact = mongoose.model('Artifact', artifactSchema)
module.exports = Artifact