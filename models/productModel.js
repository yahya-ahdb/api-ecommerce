const mongoose= require("mongoose")

const ProductSchema = new mongoose.Schema({
    name :{
        type:String,
        required : true
    },
    desc :{
        type:String,
        required : true
    },
    image :{
        type:String,
        required : true
    },
    price :{
        type:String,
        required : true
    },
    category :{
        type:Array,
        required : true
    },
})

module.exports = mongoose.model("Product",ProductSchema)
