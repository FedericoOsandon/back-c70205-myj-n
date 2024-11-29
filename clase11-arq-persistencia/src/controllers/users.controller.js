// Controller o negocio
const { userService } = require("../services")


class UserController {
    constructor(){
        this.userService = userService
    }

    getUsers = async (req, res)=>{
        try {
            const users = await this.userService.get()
            res.send({status: 'success', data: users})
            
        } catch (error) {
            console.log(error)
        }
    }

    createUser = async (req, res) => {
        const { first_name, last_name, email, password } = req.body
        // fullName
    
        if (!email) {
            return res.send({status: 'error', error: 'faltan llenar campos'})
        }
        
        // console.log(newUser)
        const result = await this.userService.create({ first_name, last_name, email, password})
        // dto quite el pass del user
        res.send({ status: 'success', data: result })
    }

    getUser = async (req, res)=>{
        const { uid } = req.params
        const user = await this.userService.getBy({_id: uid})
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
        const result = await this.userService.update(uid, userToUpdate)
    
        res.send({status: 'success', data: result})
    }
    deleteUser = async (req, res)=>{
        const { uid } = req.params
        const result = await this.userService.deleteUser.delete(uid)
        res.send({status: 'success', data: result})
    }

}

module.exports = UserController