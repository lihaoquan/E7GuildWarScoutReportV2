const Token = require('../models/Token')

// Save refresh tokens
let saveToken = (username, refresh_token) => {
    return new Promise((resolve, reject) => {
        const token = new Token({
            username: username,
            token: refresh_token
        })

        token.save()
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// Delete refresh token
let deleteToken = (username) => {
    return new Promise((resolve, reject) => {
        Token.deleteOne({ username: username })
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
    })
}

// Find username associated to a token
let getUsernameByToken = (token) => {
    return new Promise((resolve, reject) => {
        Token.find({
            token: token
        }).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        })
    })
}

module.exports = {
    saveToken,
    deleteToken,
    getUsernameByToken
}