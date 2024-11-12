const express       = require('express')
const appRouter     = require('./routes/api/index.js')
const { connectDb } = require('./config')
const handlebars    = require('express-handlebars')
// int 1 mod 2
const cookie        = require('cookie-parser')
const session       = require('express-session')
const MongoStore    = require('connect-mongo')
const passport      = require('passport')
const { initializePassport } = require('./config/passport.config.js')

const app = express()
const PORT = 8080

connectDb()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))


app.use(cookie('palabraSecreta'))
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/c70205'
    }),
    ttl: 1000 * 60 * 60 * 24
}))

initializePassport() //-> crear
app.use(passport.initialize())
app.use(passport.session())

// config handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use(appRouter)

app.listen(PORT, err =>{
    if (err) {
        console.log(err)
    }
    console.log(`Server escuchando en puerto: ${PORT}`) 
})