const passport = require('passport')
const GithubStrategy = require('passport-github2')
const { userModel } = require('../models/users.model')



const initializePassport = () => {
    // estrategia authentication -> middleware

    // ... otras estrategias
    passport.use('github', new GithubStrategy({
        clientID: 'Iv23li4kpN72kckgGPLX',
        clientSecret: '1d20210dabf930718509851f7428daab5c4537a6',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'        
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile)
            let user = await userModel.findOne({email: profile._json.email})
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: profile._json.name,
                    email: profile._json.email,
                    password: '123456'
                }
                let result = await userModel.create(newUser)
                return done(null, result)
            }
            done(null, user)

        } catch (error) {
            return done(done)
        }
    }))

    passport.serializeUser((user, done)=>{
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done)=>{
        let user = await userModel.findById({_id: id})
        done(null, user)
    })
}

module.exports = {
    initializePassport
}

// export initializePassport