const mongoose = require('mongoose')

const schema = mongoose.Schema({
    email:{
        required: true,
        type: String
    },
    password:{
        required: true,
        type: String
    },
    role:{
        type: String,
        default: "User",
        enum:["User","Moderator"]
    }
})

const UserModel = mongoose.model('user', schema)

module.exports = {UserModel}