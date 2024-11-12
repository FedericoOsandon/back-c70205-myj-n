const { userModel } = require("./models/users.model")

class UserDaoMongo {
    constructor(){
        this.model = userModel
    }
    getUsers = async () => {
        try {
            return await this.model.find({})   
        } catch (error) {
            console.log(error)
        }
    }
    async getUser(filter){ // {email: email} - {_id: uid}
        return await this.model.findOne(filter)
    }
    async createUser(newUser){
        return await this.model.create(newUser)
    }
    async updateUser(uid){}
    async deleteUser(uid){}
}

module.exports = UserDaoMongo