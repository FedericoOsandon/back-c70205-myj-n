const jwt = require('jsonwebtoken')

const PRIVATE_KEY = 'CoderCl@v3Private-para-la-firma'

const generateToken = user => jwt.sign(user, PRIVATE_KEY, {expiresIn: '1d'})

const authTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) return res.status(401).send({status: 'success', error: 'not authenticated'})
    const token = authHeader.split(' ')[1]
    jwt.verify(token, PRIVATE_KEY, (error, userExtraidoDelToken) => {
        req.user = userExtraidoDelToken
        next()
    })
}

module.exports = {
    generateToken,
    authTokenMiddleware,
    PRIVATE_KEY
}


// lakjsflñasdfjñaslkfdlasdjflñasjdflñasdf-.asfd-asfdlkjsaldfjasldjfl

// Headers -> Bearer lakjsflñasdfjñaslkfdlasdjflñasjdflñasdf-.asfd-asfdlkjsaldfjasldjfl
// fetch (url, {
//     headers: {
//         authentication: Bearer token
//     }
// })