const Activity = require('../models/Activity')

// Add activities
let addActivites = (report_id, contributor, activities) => {
    return new Promise((resolve, reject) => {

        Activity.findOneAndUpdate(
            { report_id: report_id },
            {
                $push: {
                    activities: {
                        user: contributor,
                        activity: activities,
                        date: new Date()
                    }
                }
            }
        ).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        })
    })
}

// Get activity by report id
let getActivitiesByReportId = (report_id) => {
    return new Promise((resolve, reject) => {
        Activity.findOne(
            { report_id: report_id }
        )
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
    })
}

module.exports = {
    addActivites,
    getActivitiesByReportId
}