// const UserDaoMemory = require("../daos/userManagerMemory")
// const UserDaoMongo = require("../daos/MONGO/userDao.mongo")

const { UserDao, ProductDao } = require("../daos/factory")
const ProductRepository = require("../repositories/products.repository")
const UserRepository = require("../repositories/users.repository")


const userService    = new UserRepository(new UserDao())
const productService = new ProductRepository(new ProductDao())

module.exports = {
    userService,
    productService
}

//next js
// aws -> serverles -> funciones 