const Record = require('../models/Record')

const utilities = require('./__utilities')

const mongoose = require('mongoose')

const FORT_NAMES = ['Top Fort', 'Mid Fort', 'Bottom Fort', 'Stronghold']

// Create a new record
let createRecord = (author, enemyGuildName, date) => {
    return new Promise(async (resolve, reject) => {

        let author_id = await utilities.getUserIdFromUsername(author)

        // Initialize forts
        let forts = []
        for (var i = 0; i < FORT_NAMES.length; i++) {
            let fort = {}
            fort.name = FORT_NAMES[i]
            fort.fort_type = (i + 1)
            forts.push(fort)
        }

        const record = new Record({
            author: author_id,
            enemyGuild: enemyGuildName,
            date: date || new Date(),
            forts: forts
        })

        record.save()
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// Create Fort
let createFort = (record_id, fortPlayerName, author, get_fort_id = false) => {
    return new Promise((resolve, reject) => {

        let new_id = mongoose.Types.ObjectId()

        Record.findOneAndUpdate(
            { _id: record_id },
            { $push: { forts: { _id: new_id, name: fortPlayerName, fort_type: 0, author: author || null } } },
            { new: true }
        )
            .then((result) => {
                get_fort_id ? resolve(new_id) : resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// Read all records
let getAllRecords = () => {
    return new Promise((resolve, reject) => {
        Record.find()
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// Read single record
let getSingleRecord = (record_id) => {
    return new Promise((resolve, reject) => {
        Record.findOne({ _id: record_id })
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// Read single record based on fort id
let getRecordByFortId = (fort_id) => {
    return new Promise((resolve, reject) => {
        Record.findOne({ forts: { '$elemMatch': { _id: fort_id } } })
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

module.exports = {
    createRecord,
    createFort,
    getAllRecords,
    getSingleRecord,
    getRecordByFortId
}