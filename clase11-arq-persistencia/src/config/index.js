const { connect } = require('mongoose')
const dotenv = require('dotenv')
const { program } = require('../utils/commander')
const { MongoSingleton } = require('./singleton')

const { mode, persistence } = program.opts()

console.log(mode, persistence)

dotenv.config({
    path: mode==='development' ? './.env.development' : './.env.production'
})

const objectConfig = {
    // port: process.env.PORT || 8080,
    port: 8081,
    mongoDB: process.env.MONGO_DB,
    persistence
}

// super conj de url // http://... 
const uri = process.env.MONGO_DB
console.log(uri)

const connectDb = async () => {
    // console.log('base de datos conectada')
    // await connect(uri)

    await MongoSingleton.getInstance()
}



module.exports = {
    connectDb,
    objectConfig
}
