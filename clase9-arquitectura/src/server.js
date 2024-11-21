const express       = require('express')

const appRouter    = require('./routes/index.js')

const { connectDb, objectConfig } = require('./config')
const handlebars    = require('express-handlebars')
const session       = require('express-session')
const passport = require('passport')
const { initializePassport } = require('./utils/initializePassport.js')
const cookie = require('cookie-parser')
const UserRouter  = require('./routes/api/usersClass.router.js')

const app = express()
const PORT = objectConfig.port

connectDb()
app.use(express.json()) // obj.json() m -> función 
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))
app.use(cookie())

initializePassport()
app.use(passport.initialize())


// config handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


// app.post('/uploader', uploader.single('myFile'), (req, res)=>{

//     res.send('Imagen subida')
// })


app.use(appRouter)

app.use('*', (req,res)=>{
    res.status(404).send('no existe esta url 404')
})

app.listen(PORT, err =>{
    if (err) {
        console.log(err)
    }
    console.log(`Server escuchando en puerto: ${PORT}`) 
})


