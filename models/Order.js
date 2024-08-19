const mongoose=require('mongoose')

const OrderSchema=mongoose.Schema({
    items:[
        {
            product:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
            quantity:{type:Number,required:true},
            price:{type:Number,required:true}
        }
    ],
    totalPrice:{type:Number,required:true},
    fullName:{type:String,required:true},
    address:{type:String,required:true},
    email:{type:String,required:true},
    city:{type:String,required:true},
    country:{type:String,required:true},
    state:{type:String,required:true},
    zipCode:{type:String,required:true},
    paymentMethod:{type:String,required:true},
    createdAt:{type:Date, default:Date.now}

})

module.exports=mongoose.model('Order',OrderSchema)