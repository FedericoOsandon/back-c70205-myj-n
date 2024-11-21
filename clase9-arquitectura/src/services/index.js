const UserDaoMongo = require("../daos/userDao.mongo")

const userService = new UserDaoMongo()

module.exports = {
    userService
}