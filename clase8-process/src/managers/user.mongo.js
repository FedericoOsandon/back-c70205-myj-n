const { userModel } = require("../models/users.model")


class UserDaoMongo { // manager User
    constructor() {
        this.userModel = userModel
    }

    getProducts   = async () => await this.userModel.find()              
    
    getProduct    = async filter => await this.userModel.findOne(filter)  

    createProduct = async newUser => await this.userModel.create(newUser)

    updateProduct = async (pid, productToUpdate)=> await this.userModel.create({_id: pid, productToUpdate})

    deleteProduct = async pid => await this.userModel.deleteOne({_id: pid})
              
}

module.exports = UserDaoMongo