const passport = require('passport')
const jwt = require('passport-jwt')
const { userModel } = require('../models/users.model')
const { PRIVATE_KEY } = require('./jwt')

const JWTStratgy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = () => {
    // extraer las cookie de las consultas
    const cookieExtractor = req => {
        let token = null 
        if(req && req.cookies) token = req.cookies['token']
        return token
    }
    
    passport.use('jwt', new JWTStratgy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY 
    }, async (contenidoDesencriptadoToken, done)=>{
        try {
            return done(null, contenidoDesencriptadoToken)
        } catch (error) {
            return done(error)
        }
    }))




    
}

module.exports = {
    initializePassport
}

// export initializePassport