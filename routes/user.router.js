const Router = require('koa-router')
const router = new Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const _user = require('../db/lib/_user')
const _token = require('../db/lib/_token')

// router.post('/change-password', async ctx => {
//     let post = ctx.request.body
//     let user = post.user
//     let new_password = post.new_password

//     let details = await _user.getUserDetailsByUsername(user)
//     let result = await _user.updateUserPassword(details._id, new_password)

//     ctx.response.status = 201
//     ctx.body = result
// })

router.post('/login', async ctx => {

    let post = ctx.request.body
    let user = post.username
    let plaintextPassword = post.password

    let details = await _user.getUserDetailsByUsername(user)

    if (details) {
        let auth_result = await bcrypt.compare(plaintextPassword, details.password)

        if (auth_result) {

            const accessToken = jwt.sign(
                { 'username': details.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5m' }
            )

            const refreshToken = jwt.sign(
                { 'username': details.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            )

            await _token.saveToken(details.username, refreshToken)

            ctx.cookies.set('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })

            // ctx.cookies.set('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })

            ctx.response.status = 200
            ctx.body = { username: details.username, _id: details._id, token: accessToken, display_name: details.display_name, role: details.role }
        } else {
            ctx.response.status = 500
            ctx.body = { auth: false, err: auth_result }
        }
    } else {
        ctx.response.status = 500
        ctx.body = { auth: false, err: 'User Not Found.' }
    }
})

router.post('/register', async ctx => {
    let post = ctx.request.body

    await _user.createUser(post.username, post.password, post.email, post.display_name)
        .then((data) => {
            ctx.response.status = 201
            ctx.body = data
        })
        .catch((err) => {
            console.log(err)
            ctx.response.status = 500
            ctx.body = err
        })
})


router.get('/logout', async ctx => {
    if (!ctx.cookies?.get('jwt')) return ctx.response.status = 204
    const refreshToken = ctx.cookies.get('jwt')

    let user = (await _token.getUsernameByToken(refreshToken))[0]

    if (user.length == 0) {
        ctx.cookies.set('jwt', null)
        return ctx.response.status = 204
    }

    await _token.deleteToken(user.username)
    ctx.cookies.set('jwt', null)
    ctx.response.status = 204
})

router.get('/refresh', async ctx => {
    if (!ctx.cookies?.get('jwt')) return ctx.response.status = 401
    const refreshToken = ctx.cookies.get('jwt')

    let user = (await _token.getUsernameByToken(refreshToken))[0]
    if (user.length == 0) ctx.response.status = 403

    let user_details = await _user.getUserDetailsByUsername(user.username)

    await jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || decoded.username != user.username) return ctx.response.status = 403
            const accessToken = jwt.sign(
                { 'username': decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5m' }
            )
            ctx.body = { username: decoded.username, _id: user_details._id, token: accessToken, display_name: user_details.display_name, role: user_details.role }
        }
    )
})

module.exports = router