const mongoose= require("mongoose")
const {Schema}= mongoose

const OrderItemsSchema= new Schema({
    order_id:{
        type: Number,
        required: true
    },
    item:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type:Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
        required: true
    }
})
module.exports= mongoose.model("orderitem", OrderItemsSchema)