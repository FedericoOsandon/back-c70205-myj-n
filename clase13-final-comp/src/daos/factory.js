const { objectConfig } = require("../config")


// dao de usuario mongo
//dao de usuario file
//dao de usuario memory
//importaciones dao products mongo
//importaciones dao products file
//importaciones dao products memory
//importaciones dao carts memory
//importaciones dao carts file
//importaciones dao carts mongo

const { persistence } = objectConfig

let UserDao
let ProductDao
let CartDao


switch (persistence) {
    case 'memory':
        const UserDaoMemory = require("./MEMORY/userManagerMemory")
        UserDao = UserDaoMemory
        break;
    case 'file':
        
        break;

    default:
        // conectDb()
        const UserDaoMongo = require("./MONGO/userDao.mongo.js")
        UserDao = UserDaoMongo

        const ProductDaoMongo = require('./MONGO/productsDao.mongo.js')
        ProductDao = ProductDaoMongo
        break;
}

module.exports = {
    UserDao,
    ProductDao
}