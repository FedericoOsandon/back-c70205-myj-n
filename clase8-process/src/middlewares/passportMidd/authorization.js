exports.authorization = roles => { // array

    return async (req, res, next) => {
        if(!req.user) return res.status(401).send({error: 'Unauthorized'})
        // if( req.user.role !== role ) return res.status(403).send({error: 'Not permissions'})
        if(!roles.includes(req.user.role)) return res.status(403).send({error: 'Not permissions'})
        next()
    }
}
