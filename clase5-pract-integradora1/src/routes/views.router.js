const { Router } = require('express')

const router = Router()

// router.use('/', (req, res) => {
//     res.render('index', {
//         username: 'Federico'
//     })
// })

router.use('/login', (req, res) => {
    res.render('login')
})

router.use('/register', (req, res) => {
    res.render('register')
})

module.exports = router