const { Router } = require('express')

const passport = require('passport')
const { userModel } = require('../../daos/models/users.model')
const { generateToken, authTokenMiddleware } = require('../../utils/jwt')
const { passportCall } = require('../../middlewares/passportMidd/passportCall')
const { authorization } = require('../../middlewares/passportMidd/authorization')

const router = Router()


router.post('/register', async (req, res) => {
    const {first_name, last_name, email, password } = req.body
    if (!email || !password) {
        return res.status(400).send({status: 'error', error: 'email y password son obligatorios'})
    }

    const userFound = await userModel.findOne({email})

    if (userFound) {
        return res.status(401).send({status: 'error', error: 'El usuario ya existe'})
    }

    
    // crear el carrio - manager carts
    // resp._id

    const newUser = {
        first_name, 
        last_name,
        email,
        password, // haseado
        // cartID: resp_id
    }

    const result = await userModel.create(newUser)

    res.redirect('/login')
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body
    // console.log(email, password)
    const userFound = await userModel.findOne({email})
    console.log(userFound)
    if (!userFound) {
        return res.send({stauts: 'error', error: 'no existe el usuario'})
    }

    if (userFound.email !== email || userFound.password !== password) {
        return res.send({stauts: 'error', error: 'el email o la contraseña no coinciden'})
    }
    
    // if (isValidPassword(password, userFound.password)) {
    //     return res.send({stauts: 'error', error: 'el email o la contraseña no coinciden'})
    // }
    // console.log(userFound)
    const token = generateToken( {id: userFound._id, email: userFound.email, role: 'user'} )



    res.cookie('token', token, {
        maxAge: 60 * 60 * 1000 * 24, // un día 24h
        httpOnly: true
    }).send({status: 'success'})    
})


/// ruta de prueba - nada más
router.get('/current', passportCall('jwt'), authorization( ['user-premium', 'admin'] ), (req, res) => {
    res.send({dataUser: req.user, message:'datos sensibles'})
})


module.exports = router



// 'atuhorizaron': sessionStorage.getItem('token')


// cliente envia token
// token -> cookies (automatica)

// header -> token (localStorage) -> petición servidor (fetch) BERER jaslñdfasdfalñsdfkasldfasdf