const { userModel } = require("../models/users.model.js")

// Modelo o persistencia -> DAo -> data access object
class UserDaoMongo { // manager User
    constructor() {
        this.userModel = userModel
    }

    get   = async () => await this.userModel.find()              
    
    getBy  = async filter => await this.userModel.findOne(filter)  

    create = async newUser => await this.userModel.create(newUser)

    update = async (uid, productToUpdate)=> await this.userModel.create({_id: uid, productToUpdate})

    delete = async uid => await this.userModel.deleteOne({_id: uid})
              
}

module.exports = UserDaoMongo