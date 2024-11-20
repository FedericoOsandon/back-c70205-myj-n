const { Router } = require('express')
const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../utils/jwt')

class RouterClass { // clase padre
    constructor(){
        this.router = Router()
        this.init()
    }

    getRouter (){
        return this.router
    } 

    init(){} // definimos en la clase hija

    applyCallbacks(callbacks){
        return callbacks.map(callback => async (...params) => { // [req(0), res(1)]
            try {
                await callback.apply(this, params)
            } catch (error) {
                params[1].status(500).send(error)
            }
        })
    }

    generateCustomResponses  = (req, res, next) => {
        res.sendSuccess = payload => res.send({status: 'success', payload})
        res.sendServerError = error => res.status(500).send({status: 'error', error})
        res.sendUserError = error => res.status(400).send({status: 'error', error})
        // las respuestas que necesitemos
        next()
    }
// function polices (){
//     reutnr () => {}
// }
    handlePolicies = policies => (req, res, next) => {
        if(policies[0] === 'PUBLIC') return next()
        const authHeaders = req.headers.autorization
    // BEARER jalkhjsflasfñlasdflsajdf
        if(!authHeaders) return res.status(401).send({status: 'success', error: 'Unauthorizated'})
        const token = authHeaders.split(' ')[1]
        let user = jwt.verify(token, PRIVATE_KEY)
        if(!policies.includes(user.role.toUpperCase())) return res.status(403).send({error: 'Not permissions'})
        req.user = user
        next()
        
    }

    get(path, policies,...callbacks){ // [mid1, mid2,...,controlador]
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }
    post(path, policies,...callbacks){ // [mid1, mid2,...,controlador]
        this.router.post(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }
    put(path, policies,...callbacks){ // [mid1, mid2,...,controlador]
        this.router.put(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }
    delete(path, policies,...callbacks){ // [mid1, mid2,...,controlador]
        this.router.delete(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

   


}

module.exports = RouterClass


// function === arrow function

// const saludar = (...nombres) => {

// }

// saludar('fede', 'osandón')