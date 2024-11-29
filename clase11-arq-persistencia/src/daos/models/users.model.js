const { Schema, model } = require('mongoose')
// import {} from 'mongoose'
// collección en la que guardaremos nuestro documentos
const userCollection = 'users'

//definir el esq de nuestros docs

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    cartID: {
        type: Schema.Types.ObjectId,
        ref: 'carts',
    },
    role: {
        type: String,
        enum: ['user', 'user-premium', 'admin'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true
    }
})

const userModel = model(userCollection, userSchema)

module.exports = {
    userModel
}