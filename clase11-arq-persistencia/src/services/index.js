// const UserDaoMemory = require("../daos/userManagerMemory")
// const UserDaoMongo = require("../daos/MONGO/userDao.mongo")

const { UserDao } = require("../daos/factory")
const UserRepository = require("../repositories/users.repository")

const userService = new UserRepository(new UserDao())

module.exports = {
    userService
}

//next js
// aws -> serverles -> funciones 