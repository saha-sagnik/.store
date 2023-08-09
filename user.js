const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        lowercase:true
    },
    password:{
        type:String
    },
    wishList:{
        type : [String]
    }
})

module.exports = mongoose.model("User", userSchema)

