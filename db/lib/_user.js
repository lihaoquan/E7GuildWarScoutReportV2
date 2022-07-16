const User = require('../models/User')
const { v4: uuidv4 } = require('uuid')

// Create a new user
let createUser = (username, password, email, display_name) => {
    return new Promise((resolve, reject) => {

        const user = new User({
            username,
            password,
            display_name,
            email: uuidv4() + '@example.com',
            role: 1
        })

        user.save()
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// Update user's profile name
let updateUserDisplayName = (user_id, new_name) => {
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate(
            { _id: user_id },
            { display_name: new_name },
            { new: true }
        )
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// Update user's profile role
let updateUserRole = (user_id, new_role) => {
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate(
            { _id: user_id },
            { role: new_role },
            { new: true }
        )
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// Update user's profile email
let updateUserEmail = (user_id, new_email) => {
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate(
            { _id: user_id },
            { email: new_email },
            { new: true }
        )
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// Update user's profile password
let updateUserPassword = (user_id, new_password) => {
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate(
            { _id: user_id },
            { password: new_password },
            { new: true }
        )
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// Get user details by user id
let getUserDetailsById = (user_id) => {
    return new Promise((resolve, reject) => {
        User.findOne(
            { _id: user_id }
        )
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// Get user details by username
let getUserDetailsByUsername = (username) => {
    return new Promise((resolve, reject) => {
        User.findOne(
            { username: username }
        )
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

module.exports = {
    createUser,
    updateUserDisplayName,
    updateUserRole,
    updateUserEmail,
    updateUserPassword,
    getUserDetailsById,
    getUserDetailsByUsername
}