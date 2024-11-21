const { userModel } = require("../models/users.model.js")

// Modelo o persistencia -> DAo -> data access object
class UserDaoMongo { // manager User
    constructor() {
        this.userModel = userModel
    }

    getUsers   = async () => await this.userModel.find()              
    
    getUser  = async filter => await this.userModel.findOne(filter)  

    createUser = async newUser => await this.userModel.create(newUser)

    updateUser = async (uid, productToUpdate)=> await this.userModel.create({_id: uid, productToUpdate})

    deleteUser = async uid => await this.userModel.deleteOne({_id: uid})
              
}

module.exports = UserDaoMongo