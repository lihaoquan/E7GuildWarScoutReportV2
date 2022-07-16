const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    display_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail, 'invalid email'],
        index: { unique: true },
    },
    role: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    }
}, { timestamps: true })

userSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        return next()
    } catch (err) {
        return next(err)
    }
})

userSchema.pre('findOneAndUpdate', async function (next) {
    try {
        if (this._update.password) {
            const hashed = await bcrypt.hash(this._update.password, 10)
            this._update.password = hashed
        }
        next()
    } catch (err) {
        return next(err);
    }
})

userSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password)
}

const User = mongoose.model('User', userSchema)
module.exports = User