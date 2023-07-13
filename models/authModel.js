const mongosse = require("mongoose")

const UsersShema =new mongosse.Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique: true
    },
    password:{
        type : String,
        required : true
    },
    isAdmin:{
        type : String,
        default : false
    },
    address:{
        type : String,
        required : true
    },
    phone:{
        type : String,
        required : true
    },
    
}) 

module.exports = mongosse.model("Users",UsersShema)