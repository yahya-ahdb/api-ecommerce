const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    // userId :{
    //     type :String ,
    // },
    name :{
        type : String,
        required :true
    },
    address :{
        type : String,
        required :true
    },
    phone :{
        type : String,
        required :true
    },
    order :{
        type : Array,
        required :true
    },
    total :{
        type : String,
        required :true
    },
})

module.exports = mongoose.model("Order",OrderSchema)
