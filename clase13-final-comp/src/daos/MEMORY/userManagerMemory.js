


// Modelo o persistencia -> DAo -> data access object
class UserDaoMemory { // manager User
    constructor() {
        this.users = []
    }

    get   = async () => this.users             
    
    getBy  = async filter => this.users.find(user => filter.id === this.users.id)  

    create = async newUser => this.users.push(newUser)

    update = async (uid, productToUpdate) => {}

    delete = async uid => {}
              
}

module.exports = UserDaoMemory