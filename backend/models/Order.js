const mongoose= require ("mongoose")
const {Schema}= mongoose


const OrderSchema= new Schema({
    order_id:{
        type:Number,
        required: true
    },
    rider_id:{
        type: Number,
        default:0
    },
    student_id:{
        type: Number,
        required: true
    },
    eatery_id:{
        type: Number,
        required: true
    },
    totalprice:{
        type: Number,
        required: true
    },
    orderstatus:{
        type: String,
        enum:['Accepted', 'Picked', 'Delivered', ''],
        // required: true
    },
    droplocation:{
        type: String,
        required: true
    },
    paymentmethod:{
        type: String,
        enum:['Online', 'COD'],
        required: true
    }
    
})
OrderSchema.index({ order_id: 1 },  { unique: true } );
module.exports= mongoose.model('order', OrderSchema)