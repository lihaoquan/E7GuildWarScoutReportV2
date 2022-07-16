const Announcement = require('../models/Announcement')

const utilities = require('./__utilities')

// Add announcements
let addAnnouncement = (author, text) => {
    return new Promise(async (resolve, reject) => {

        let author_id = await utilities.getUserIdFromUsername(author)

        const announcement = new Announcement({
            author: author_id,
            text: text
        })

        await announcement.save()
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
    })
}

// Get latest announcement
let getLatestAnnouncement = () => {
    return new Promise((resolve, reject) => {
        Announcement.find().sort({ _id: -1 }).limit(1)
            .then((result) => {
                resolve(result[0])
            }).catch((err) => {
                reject(err)
            })
    })
}

// Get all announcements
let getAllAnnouncements = () => {
    return new Promise((resolve, reject) => {
        Announcement.findOne({})
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
    })
}

module.exports = {
    addAnnouncement,
    getLatestAnnouncement,
    getAllAnnouncements
}