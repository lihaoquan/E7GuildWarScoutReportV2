const LatestReport = require('../models/LatestReport')

// Update latest report of a fort
let updateLatestReport = (fort_id, report_id) => {
    return new Promise(async (resolve, reject) => {

        await LatestReport.findOne({ fort_id: fort_id })
            .then(async (result) => {
                if (result == null) {
                    const latestReport = new LatestReport({
                        fort_id: fort_id,
                        report_id: report_id
                    })

                    await latestReport.save()
                        .then((result) => {
                            resolve(result)
                        }).catch((err) => {
                            reject(err)
                        })
                } else {
                    await LatestReport.findOneAndUpdate(
                        { fort_id: fort_id },
                        {
                            report_id: report_id
                        }
                    ).then((result) => {
                        resolve(result)
                    }).catch((err) => {
                        reject(err)
                    })
                }
            }).catch((err) => {
                reject(err)
            })

    })
}

let getLatestReportByFortId = (fort_id) => {
    return new Promise(async (resolve, reject) => {
        LatestReport.findOne({ fort_id: fort_id })
            .then(async (result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
    })
}

module.exports = {
    updateLatestReport,
    getLatestReportByFortId
}