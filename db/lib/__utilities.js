const User = require('../models/User')

let getUserIdFromUsername = (author) => {
    return new Promise((resolve, reject) => {
        User.findOne({ username: author })
            .then((result) => {
                resolve(result._id)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

module.exports = {
    getUserIdFromUsername
}