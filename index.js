const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')

// DB
const db = require('./db/db')

// Authentication
const jwt = require('jsonwebtoken')

// Routes
const UserRoutes = require('./routes/user.router')
const MainRoutes = require('./routes/main.router')

const app = new Koa()

// TODO: whitelist CORS, add CSRF

app.use(cors({
    origins: ['http://localhost:3000', 'http://localhost'],
    credentials: 'true'
}))

app.use(bodyParser({
    jsonLimit: '10mb'
}))

app.use(UserRoutes.routes())
app.use(UserRoutes.allowedMethods())

app.use(MainRoutes.routes())
app.use(MainRoutes.allowedMethods())

db.connect().then(() => {
    app.listen(3001)
    console.log('application running.')
}, () => {
    console.log('application failed to run.')
})