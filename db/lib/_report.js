const Report = require('../models/Report')
const Record = require('../models/Record')
const Activity = require('../models/Activity')
const utilities = require('./__utilities')
const imageDataURI = require('image-data-uri')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const mongoose = require('mongoose')

const _unit = require('./_unit')
const _activity = require('./_activity')
const _latest_report = require('./_latest_report')

// Create a report
let createReport = (fort_id, author, unit_data, get_report_id = false) => {
    return new Promise(async (resolve, reject) => {

        let new_id = mongoose.Types.ObjectId()

        let author_id = await utilities.getUserIdFromUsername(author)

        const activity = new Activity({
            report_id: new_id
        })

        await activity.save()

        const report = new Report({
            _id: new_id,
            author: author_id,
            date: new Date(),
            unit_data: unit_data,
            activities: activity
        })

        await report.save()

        await Record.findOneAndUpdate(
            { forts: { '$elemMatch': { _id: fort_id } } },
            {
                $push: {
                    'forts.$[i].reports': new_id
                }
            },
            {
                new: true,
                arrayFilters: [{ 'i._id': fort_id }]
            }
        )
            .then((result) => {
                get_report_id ? resolve(new_id) : resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// Update a report
let updateReport = (report_id, author, unit_data, fort_id) => {
    return new Promise(async (resolve, reject) => {

        let old_report = await Report.findOne({ _id: report_id })

        if (!old_report) return reject()

        let author_id = await utilities.getUserIdFromUsername(author)

        let changes = []

        let units_to_resolve = []

        for (var j = 0; j < old_report.unit_data.rounds.length; j++) {

            for (var i = 0; i < old_report.unit_data.rounds[j].units.length; i++) {

                let unit_changes = { round: (j + 1), unit: (i + 1), updates: [] }

                let new_unit = unit_data.rounds[j].units[i]
                let old_unit = old_report.unit_data.rounds[j].units[i]

                if (new_unit.unit == old_unit.unit && new_unit.speed == old_unit.speed && new_unit.health == old_unit.health && new_unit.artifact == old_unit.artifact && new_unit.item_set == old_unit.item_set) continue

                if (!units_to_resolve.includes(new_unit.unit)) units_to_resolve.push(new_unit.unit)
                if (!units_to_resolve.includes(old_unit.unit)) units_to_resolve.push(old_unit.unit)

                if (new_unit.unit.toString() != old_unit.unit.toString()) unit_changes.unit_swap = { old: old_unit.unit, new: new_unit.unit }
                else unit_changes.affected_unit = old_unit.unit
                if (new_unit.speed != old_unit.speed) unit_changes.updates.push(`speed from ${old_unit.speed} to ${new_unit.speed}`)
                if (new_unit.health != old_unit.health) unit_changes.updates.push(`health from ${old_unit.health} to ${new_unit.health}`)
                if (new_unit.artifact != old_unit.artifact) unit_changes.updates.push(`artifact from ${old_unit.artifact} to ${new_unit.artifact}`)
                if (new_unit.item_set != old_unit.item_set) unit_changes.updates.push(`item set from ${old_unit.item_set} to ${new_unit.item_set}`)

                changes.push(unit_changes)
            }
        }

        let units_obj = {}

        let units = await _unit.getUnitsById(units_to_resolve)
        for (var i = 0; i < units.length; i++) {
            units_obj[units[i]._id] = units[i]
        }

        let changes_combined = []

        for (var i = 0; i < changes.length; i++) {
            if (changes[i].unit_swap) {
                changes[i].updates = [`Changed unit from ${units_obj[changes[i].unit_swap.old.toString()].unit_name} to ${units_obj[changes[i].unit_swap.new.toString()].unit_name}`, ...changes[i].updates]
            } else if (changes[i].affected_unit) {
                changes[i].updates = [`Updated ${units_obj[changes[i].affected_unit].unit_name}`, ...changes[i].updates]
            }

            let changes_concat = ''

            changes_concat += changes[i].updates[0] + ': '
            for (var j = 1; j < changes[i].updates.length; j++) {
                changes_concat += changes[i].updates[j] + ', '
            }

            changes_combined.push(changes_concat.substring(0, changes_concat.length - 1))
        }

        if (changes_combined.length == 0) return resolve()

        await _activity.addActivites(report_id, author_id, changes_combined)

        _latest_report.updateLatestReport(fort_id, report_id)

        Report.findOneAndUpdate(
            { _id: report_id },
            { $addToSet: { contributors: author_id }, unit_data: unit_data },
            { new: true }
        ).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        })
    })
}

// Get reports by username
let getReportsByUsername = (username) => {
    return new Promise(async (resolve, reject) => {

        let user_id = await utilities.getUserIdFromUsername(username)

        Report.find({ author: user_id })
            .then(async (result) => {
                let data = []
                for (var i = 0; i < result.length; i++) {
                    let details = await getFortDetailsByReportId(result[i]._id)
                    if (details) data.push(details)
                }
                resolve({ reports: result, records: data })
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// Get single report
let getSingleReport = (report_id, viewer) => {
    return new Promise(async (resolve, reject) => {

        let viewer_id = await utilities.getUserIdFromUsername(viewer)

        Report.findOneAndUpdate(
            { _id: report_id },
            { $addToSet: { viewers: viewer_id } },
            { new: true }
        ).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        })
    })
}

// Add a comment
let addCommentToReport = (report_id, author, body, images) => {
    return new Promise(async (resolve, reject) => {

        let author_id = await utilities.getUserIdFromUsername(author)

        let files = []

        for (var i = 0; i < images.length; i++) {
            let data = imageDataURI.decode(images[i].data_url)
            let fileName = uuidv4() + '.png'
            fs.writeFileSync(path.resolve(__dirname, '..') + '/local/' + fileName, data.dataBuffer)
            files.push(fileName)
        }

        Report.findOneAndUpdate(
            { _id: report_id },
            {
                $push: {
                    comments: {
                        author: author_id,
                        date: new Date(),
                        body: body,
                        files: files
                    }
                }
            },
            { new: true }
        ).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        })
    })
}

// Get fort details by report id
let getFortDetailsByReportId = (report_id) => {
    return new Promise(async (resolve, reject) => {
        Record.findOne(
            { forts: { '$elemMatch': { reports: report_id } } },
        )
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// Get comments by username
let getCommentsByUsername = (username) => {
    return new Promise(async (resolve, reject) => {

        let user_id = await utilities.getUserIdFromUsername(username)

        Report.find(
            { comments: { '$elemMatch': { author: user_id } } },
        )
            .then(async (result) => {
                let data = []
                for (var i = 0; i < result.length; i++) {
                    let details = await getFortDetailsByReportId(result[i]._id)
                    if (details) data.push(details)
                }
                resolve({ reports: result, records: data })
            })
            .catch((err) => {
                reject(err)
            })
    })
}

module.exports = {
    createReport,
    updateReport,
    getSingleReport,
    addCommentToReport,
    getReportsByUsername,
    getFortDetailsByReportId,
    getCommentsByUsername
}