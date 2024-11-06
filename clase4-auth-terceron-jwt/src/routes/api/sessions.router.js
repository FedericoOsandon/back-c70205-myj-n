const { Router } = require('express')

const passport = require('passport')
const { userModel } = require('../../models/users.model')
const { generateToken, authTokenMiddleware } = require('../../utils/jwt')

const router = Router()



// router.get('/github', passport.authenticate('github', {scope: ['user:email']}) ,async (req, res) => {})

// router.get('/githubcallback', passport.authenticate('github',{failureRedirect: '/login'}) ,async (req, res) => {
//     req.session.user = req.user
//     res.redirect('/')
// })











router.post('/register', async (req, res) => {
    const {first_name, last_name, email, password } = req.body
    if (!email || !password) {
        return res.status(400).send({status: 'error', error: 'email y password son obligatorios'})
    }

    const userFound = await userModel.findOne({email})

    if (userFound) {
        return res.status(401).send({status: 'error', error: 'El usuario ya existe'})
    }

    const newUser = {
        first_name, 
        last_name,
        email,
        password
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
    console.log(userFound)
    const token = generateToken( {id: userFound._id, email: userFound.email, role: 'user'} )
    res.send({status: 'success', token})


    
})

router.get('/current', authTokenMiddleware, (req, res) => {
    res.send({dataUser: req.user, message:'datos sensibles'})
})

// router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
//     res.send({dataUser: req.user,message:'datos sensibles'})
// })

// fetch('url', {
//     method: 'post',
//     headers: {
//         'Content-Type': 'application/json',
//         'token': 'jasldkfñasjflasjfdlasjlfjasldfj' 
//     },
        // body: {}
// })
// router.post('/changepass', async (req, res) => {
//     const { email, password } = req.body
//     // console.log(email, password)
//     const userFound = await userServise.getUser({email})
//     // console.log(userFound)
//     if (!userFound) {
//         return res.send({stauts: 'error', error: 'no existe el usuario'})
//     }

//     // const result = await userServise.updateuser()

//     res.send('se a cambiado correctamente la contraseña')
// })


// router.get('/logout', (req, res)=> {
//     req.session.destroy( error => {
//         if (error) return res.send({status: 'error', error})
//     })
//     res.send('logout')
// })

module.exports = router



// 'atuhorizaron': sessionStorage.getItem('token')