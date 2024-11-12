const passport = require('passport')
const passportLocal = require('passport-local')
const UserDaoMongo = require('../manager/Mongo/usersManagerMongo')
const { createHash, isValidPAssword } = require('../utils/createHash')

const LocalStrategy = passportLocal.Strategy
const userService   = new UserDaoMongo()

const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const {first_name, last_name} = req.body
        try {
            const userFound = await userService.getUser({email: username})      
            if(!userFound) return done(null, false)  
                
            let newUser = {
                first_name, 
                last_name, 
                email: username, 
                password: createHash(password)
            }
            let result = await userService.createUser(newUser)
            return done(null, result)

        } catch (error) {
            return done('Error al crear un usuario')
        }
    }))

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const user = userService.getUser({email: username})
            if(!user) return DelayNode(null, false)

            if(!isValidPAssword(password, user.password)) return done(null, false)

            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done)=> {
        let user = await userService.getUser({_id: id})
        done(null, user)
    })
}

module.exports = {
    initializePassport
}