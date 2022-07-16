const mongoose = require('mongoose')

const dbURI = 'mongodb://localhost/gw-report'

let models = [require('./models/Activity'), require('./models/Artifact'), require('./models/Record'), require('./models/Unit'), require('./models/User'), require('./models/Report')]

let connect = () => {
    return new Promise((resolve, reject
    ) => {
        mongoose.connect(dbURI)
            .then((result) => {
                console.log('connected to db')

                // for (var i = 0; i < models.length; i++) {
                //     models[i].deleteMany({}, function (err) {
                //         console.log('collection removed')
                //     })
                // }

                resolve()
            }).catch((err) => {
                console.log(err)
                reject()
            })
    })
}

module.exports = {
    connect
}