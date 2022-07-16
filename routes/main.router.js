const Router = require('koa-router')
const router = new Router({ prefix: '/api' })
const jwt = require('jsonwebtoken')
const imageDataURI = require('image-data-uri')
const fs = require('fs')
const path = require('path')

const _record = require('../db/lib/_record')
const _report = require('../db/lib/_report')
const _user = require('../db/lib/_user')
const _unit = require('../db/lib/_unit')
const _artifact = require('../db/lib/_artifact')
const _activity = require('../db/lib/_activity')
const _latest_report = require('../db/lib/_latest_report')
const _announcement = require('../db/lib/_announcement')

// _unit.initUnits() 
// _artifact.initArtifacts()

router.use(async (ctx, next) => {

    const authHeader = ctx.get('authorization')

    if (!authHeader) return ctx.response.status = 401

    const token = authHeader.split(' ')[1]
    await jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return ctx.response.status = 403 // invalid token
            ctx.user = decoded.username
            ctx.state.user = ctx.user
            await next()
        }
    )
})

router.post('/create-record', async ctx => {

    let post = ctx.request.body

    await _record.createRecord(ctx.state.user, post.guild_name, post.war_date)
        .then((data) => {
            ctx.response.status = 201
            ctx.body = data
        })
        .catch((err) => {
            ctx.response.status = 500
            ctx.body = err
        })
})

router.post('/update-report', async ctx => {
    let post = ctx.request.body

    let data = {
        rounds: [
            {
                units: []
            },
            {
                units: []
            }
        ]
    }

    for (var i = 0; i < 3; i++) {
        data.rounds[0].units.push({
            unit: post['unit_' + (i + 1) + '_id'],
            speed: !isNaN(post['unit_' + (i + 1) + '_speed']) ? post['unit_' + (i + 1) + '_speed'] : 0,
            health: !isNaN(post['unit_' + (i + 1) + '_health']) ? post['unit_' + (i + 1) + '_health'] : 0,
            artifact: post['unit_' + (i + 1) + '_artifact_id'],
            item_set: post['unit_' + (i + 1) + '_item_set'],
        })
    }

    for (var i = 3; i < 6; i++) {
        data.rounds[1].units.push({
            unit: post['unit_' + (i + 1) + '_id'],
            speed: !isNaN(post['unit_' + (i + 1) + '_speed']) ? post['unit_' + (i + 1) + '_speed'] : 0,
            health: !isNaN(post['unit_' + (i + 1) + '_health']) ? post['unit_' + (i + 1) + '_health'] : 0,
            artifact: post['unit_' + (i + 1) + '_artifact_id'],
            item_set: post['unit_' + (i + 1) + '_item_set'],
        })
    }

    await _report.updateReport(post.report_id, post.author, data, post.fort_id)
        .then((data) => {
            ctx.response.status = 200
            ctx.body = { status: 'ok' }
        }, async () => {
            await _report.createReport(post.fort_id, post.author, data)
                .then((data) => {
                    ctx.response.status = 200
                    ctx.body = { status: 'ok' }
                })
                .catch((err) => {
                    ctx.response.status = 500
                    ctx.body = err
                })
        })
        .catch((err) => {
            ctx.response.status = 500
            ctx.body = err
        })
})

router.get('/records', async ctx => {
    await _record.getAllRecords()
        .then((data) => {
            ctx.response.status = 200
            ctx.body = data
        })
        .catch((err) => {
            ctx.response.status = 500
            ctx.body = err
        })
})

router.get('/record/:id', async ctx => {
    await _record.getSingleRecord(ctx.params.id)
        .then((data) => {
            ctx.response.status = 200
            ctx.body = data
        })
        .catch((err) => {
            ctx.response.status = 500
            ctx.body = err
        })
})

router.get('/forts/:id', async ctx => {
    await _record.getRecordByFortId(ctx.params.id)
        .then((data) => {
            ctx.response.status = 200
            ctx.body = data
        })
        .catch((err) => {
            ctx.response.status = 500
            ctx.body = err
        })
})

router.get('/report-detail-options', async ctx => {
    await _unit.getAllRecords(ctx.params.id)
        .then((data) => {
            ctx.response.status = 200
            ctx.body = data
        })
        .catch((err) => {
            ctx.response.status = 500
            ctx.body = err
        })
})

router.get('/my-reports/:user', async ctx => {
    let user = ctx.params.user
    await _report.getReportsByUsername(user)
        .then((data) => {
            ctx.response.status = 200
            ctx.body = data
        })
        .catch((err) => {
            ctx.response.status = 500
            ctx.body = err
        })
})

router.get('/my-comments/:user', async ctx => {
    let user = ctx.params.user
    await _report.getCommentsByUsername(user)
        .then((data) => {
            ctx.response.status = 200
            ctx.body = data
        })
        .catch((err) => {
            ctx.response.status = 500
            ctx.body = err
        })
})

router.get('/get-fort-by-report-id/:report', async ctx => {
    let report_id = ctx.params.report
    await _report.getFortDetailsByReportId(report_id)
        .then((data) => {
            ctx.response.status = 200
            ctx.body = data
        })
        .catch((err) => {
            ctx.response.status = 500
            ctx.body = err
        })
})

router.get('/report-details/:id', async ctx => {

    let report_details,
        report_activities

    let users_to_resolve = []
    let resolved_users = {}

    let resolved_units = {}
    let resolved_artifacts = {}

    let images_to_resolve = []
    let resolved_images = {}

    if (ctx.params.id == -1) {
        let unit_list = await _unit.getAllUnits()
        let artifact_list = await _artifact.getAllArtifacts()

        ctx.response.status = 200
        ctx.body = JSON.stringify({ unit_list, artifact_list })
        return
    }

    report_details = await _report.getSingleReport(ctx.params.id, ctx.state.user)

    if (report_details) {
        await new Promise((resolve, reject) => {
            resolve()
        })
            .then(() => {
                return _activity.getActivitiesByReportId(ctx.params.id)
            })
            .then(async (activities) => {
                report_activities = activities
            }).then(async () => {
                // Get all the user id that needs to be resolved (find username, display name)
                users_to_resolve.push(report_details.author)
                users_to_resolve = [...users_to_resolve, ...report_details.contributors, ...report_details.viewers]

                for (var i = 0; i < report_details.comments.length; i++) {
                    users_to_resolve.push(report_details.comments[i].author)
                    if (report_details.comments[i].files.length > 0) {
                        for (var j = 0; j < report_details.comments[i].files.length; j++) {
                            images_to_resolve.push(report_details.comments[i].files[j])
                        }
                    }
                }

                for (var i = 0; i < images_to_resolve.length; i++) {
                    let file = path.resolve(__dirname, '..') + '/db/local/' + images_to_resolve[i]
                    let content = fs.readFileSync(file)
                    let dataURL = imageDataURI.encode(content, 'PNG')
                    if (!resolved_images[images_to_resolve[i]]) resolved_images[images_to_resolve[i]] = dataURL
                }

                for (var i = 0; i < report_activities.activities.length; i++) users_to_resolve.push(report_activities.activities[i].user)

                // Resolve if not already done
                for (var i = 0; i < users_to_resolve.length; i++) {
                    if (!resolved_users[users_to_resolve[i]]) {
                        let user_data = await _user.getUserDetailsById(users_to_resolve[i])
                        resolved_users[users_to_resolve[i]] = { username: user_data.username, display_name: user_data.display_name }
                    }
                }

                // Resolve unit, artifact details by id
                let units = []
                let artifacts = []
                for (var i = 0; i < report_details.unit_data.rounds.length; i++) {
                    for (var j = 0; j < report_details.unit_data.rounds[i].units.length; j++) {
                        units.push(report_details.unit_data.rounds[i].units[j].unit)
                        artifacts.push(report_details.unit_data.rounds[i].units[j].artifact)
                    }
                }

                let units_data = await _unit.getUnitsById(units)
                for (var i = 0; i < units_data.length; i++) {
                    if (!resolved_units[units_data[i]._id]) resolved_units[units_data[i]._id] = units_data[i]
                }

                let artifact_data = await _artifact.getArtifactsById(artifacts)
                for (var i = 0; i < artifact_data.length; i++) {
                    if (!resolved_artifacts[artifact_data[i]._id]) resolved_artifacts[artifact_data[i]._id] = artifact_data[i]
                }
            }).then(async () => {

                let unit_list = await _unit.getAllUnits()
                let artifact_list = await _artifact.getAllArtifacts()

                ctx.response.status = 200
                ctx.body = JSON.stringify({ report_details, report_activities, users: resolved_users, units: resolved_units, artifacts: resolved_artifacts, unit_list, artifact_list, images: resolved_images })
            })
            .catch((err) => {
                ctx.response.status = 500
                ctx.body = err
            })
    } else {
        ctx.response.status = 204
        ctx.body = {}
    }
})

router.post('/add-comment', async ctx => {

    let post = ctx.request.body.data
    let images = ctx.request.body.images

    let fort = null

    let record = await _record.getRecordByFortId(post.fort_id)
    for (var i = 0; i < record.forts.length; i++) {
        if (record.forts[i]._id == post.fort_id) {
            fort = record.forts[i]
            break
        }
    }

    let report_id = fort.reports[fort.reports.length - 1]._id

    await _report.addCommentToReport(report_id, ctx.state.user, post.comment, images)
        .then((data) => {
            ctx.response.status = 201
            ctx.body = data
        })
        .catch((err) => {
            ctx.response.status = 500
            ctx.body = err
        })
})

router.get('/get-latest-report', async ctx => {

    let fort_ids = ctx.query['forts[]']
    let latest_report = null

    for (var i = 0; i < fort_ids.length; i++) {
        let report = await _latest_report.getLatestReportByFortId(fort_ids[i])
        if (latest_report == null) {
            latest_report = report
        } else if (report) {
            if (latest_report.updatedAt < report.updatedAt) latest_report = report
        }
    }

    if (latest_report != null) {
        ctx.response.status = 200
        ctx.body = latest_report
    } else {
        ctx.response.status = 202
        ctx.body = null
    }
})

router.get('/get-latest-announcement', async ctx => {
    await _announcement.getLatestAnnouncement()
        .then((data) => {
            if (data) {
                ctx.response.status = 200
                ctx.body = data
            } else {
                ctx.response.status = 204
                ctx.body = {}
            }
        })
        .catch((err) => {
            ctx.response.status = 500
            ctx.body = err
        })
})

router.post('/add-announcement', async ctx => {
    let post = ctx.request.body

    await _announcement.addAnnouncement(post.author, post.text)
        .then((data) => {
            ctx.response.status = 201
            ctx.body = data
        })
        .catch((err) => {
            ctx.response.status = 500
            ctx.body = err
        })
})

module.exports = router