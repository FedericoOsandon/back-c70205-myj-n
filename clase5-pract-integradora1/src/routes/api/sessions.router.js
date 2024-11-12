const { Router } = require('express')
const UserDaoMongo = require('../../manager/Mongo/usersManagerMongo')
const { createHash, isValidPAssword } = require('../../utils/createHash')
const passport = require('passport')



const router      = Router()
const userService = new UserDaoMongo()

router.post('/register', passport.authenticate('register', {failureRedirect: '/failRegister'}), async (req, res) => {
    res.send({satus: 'success', message: 'usuario registrado'})
})
router.post('/failRegister', async (req, res) => {
    res.send({satus: 'success', message: 'fallo la estrategia'})
})

router.post('/login', passport.authenticate('login', {failureRedirect: '/failLogin'}), async (req, res) => {
    if(!req.user) return res.status(401).send({satus: 'credenciales invalidas'})
    req.session.user = {
        email: req.user.email
    }
    res.send({satus: 'success', message: 'usuario registrado'})
})
router.post('/failLogin', async (req, res) => {
    res.send({satus: 'success', message: 'fallo la login'})
})


// router.post('/register', async (req, res) => {
//     const { first_name, last_name, email, password } = req.body

//     if (!email || !password) {
//         return res.status(400).send({status: 'error', error: 'email y password son obligatorios'})
//     }

//     const userFound = await userService.getUser({email})
//     if (userFound) {
//         return res.status(401).send({status: 'error', error: 'El usuario ya existe'})
//     }

//     const newUser = {
//         first_name, 
//         last_name,
//         email,
//         password: createHash(password)
//     }

//     const result = await userService.createUser(newUser)

//     res.send({ status: 'success', payload: result })
// })


// router.post('/login', async (req, res) => {
//     const { email, password } = req.body
//     // console.log(email, password)

//     if (!email || !password) {
//         return res.status(400).send({status: 'error', error: 'email y password son obligatorios'})
//     }


//     const userFound = await userService.getUser({email})
   
//     if (!userFound) {
//         return res.send({stauts: 'error', error: 'no existe el usuario'})
//     }

//     // if (userFound.email !== email || userFound.password !== password) {
//     //     return res.send({stauts: 'error', error: 'el email o la contraseña no coinciden'})
//     // }

//     if(!isValidPAssword(password, userFound.password)) return res.send({status: 'error', error: 'no coinciden las contraseñas'})
   

//     // req.session.user = {
//     //     email,
//     //     isAdmin: userFound.role === 'admin'
//     // }

//     res.send('logueado correctamente')
// })

module.exports = router