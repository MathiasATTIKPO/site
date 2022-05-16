import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderItems: [{
        name: { type: String, required: true},
        image: { type: String, required: true},
        price: { type: Number, required: true},
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required: true},
        },
    ],
    shippingAddress:{
        fullName : { type: String, required: true},
        adresse :{ type: String, required: true},
        ville: { type:String, required: true},
        pays: { type:String ,required: true},
        numero: { type:Number , required: true},
    },
    paymentMethod : {type: String, required: true},
    itemsPrice: { type: Number , required: true},
    taxPrice: {type: Number, required: true},
    totalPrice: { type: Number, required: true},
    shippingPrice:{type: Number, required: true},
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User' , required : true
    },
    isPaid :{ type: Boolean , default: false},
    paidAt :{ type: Date},
    busy :{ type: Boolean, default: false},
},
{
    timestamp: true,
});

const Order = mongoose.model('Order' , orderSchema);

export default Order;