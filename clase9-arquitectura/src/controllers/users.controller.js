// Controller o negocio
const { userService } = require("../services")


class UserController {
    constructor(){
        this.userService = userService
    }

    getUsers = async (req, res)=>{
        try {
            const users = await this.userService.getUsers()
            res.send({status: 'success', data: users})
            
        } catch (error) {
            console.log(error)
        }
    }

    createUser = async (req, res) => {
        const { first_name, last_name, email, password } = req.body
    
        if (!email) {
            return res.send({status: 'error', error: 'faltan llenar campos'})
        }
    
        const result = await this.userService.createUser({ first_name, last_name, email, password})
    
        res.send({ status: 'success', data: result })
    }

    getUser = async (req, res)=>{
        const { uid } = req.params
        const user = await this.userService.getUser({_id: uid})
        res.send({status: 'success', data: user})
    }

    updateUser = async (req, res)=>{
        const { uid } = req.params
    
        const { first_name, last_name, email } = req.body
    
        if (!email) {
            return res.send({status: 'error', error: 'faltan llenar campos'})
        }
        const userToUpdate = {
            first_name,
            last_name,
            email
        }
        const result = await this.userService.updateUser(uid, userToUpdate)
    
        res.send({status: 'success', data: result})
    }
    deleteUser = async (req, res)=>{
        const { uid } = req.params
        const result = await this.userService.deleteUser.deleteUser(uid)
        res.send({status: 'success', data: result})
    }

}

module.exports = UserController