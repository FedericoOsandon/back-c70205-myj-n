const { Router } = require('express')

const userRouter = require('./api/users.router.js')
const sessionRouter = require('./api/sessions.router.js')
const pruebasRouter = require('./api/pruebas.router.js')
const viewsRouter = require('./views.router.js')


const router = Router()

router.use('/api/sessions', sessionRouter)
router.use('/', viewsRouter)
router.use('/api/users', userRouter)
router.use('/pruebas', pruebasRouter)

module.exports = router