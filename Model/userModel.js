const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type:String,
        required: [true, "Please enter an email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    },
    token: {
        type: String
    }
})

module.exports = mongoose.model("userSchema", userSchema)