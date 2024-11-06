const express       = require('express')
const userRouter    = require('./routes/api/users.router.js')
const viewsRouter    = require('./routes/views.router.js')
const sessionsRouter    = require('./routes/api/sessions.router.js')
const { connectDb } = require('./config')
const handlebars    = require('express-handlebars')
const session       = require('express-session')
const passport = require('passport')
const { initializePassport } = require('./utils/initializePassport.js')
// import session from 'express-session'

const app = express()
const PORT = 8080

connectDb()
app.use(express.json()) // obj.json() m -> función 
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))

// app.use(session({
//     secret: 'CoderSecret'
// }))

// initializePassport()
// app.use(passport.initialize())


// config handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


// app.post('/uploader', uploader.single('myFile'), (req, res)=>{

//     res.send('Imagen subida')
// })

app.use('/api/sessions', sessionsRouter)
app.use('/', viewsRouter)
// app.use('/api/users', userRouter)
// app.use('/api/products', ()=>{})
// app.use('/api/carts', ()=>{})
// app.use('/api/tickets', ()=>{})
// app.use('/api/messages', ()=>{})

// midd errors 

app.listen(PORT, err =>{
    if (err) {
        console.log(err)
    }
    console.log(`Server escuchando en puerto: ${PORT}`) 
})