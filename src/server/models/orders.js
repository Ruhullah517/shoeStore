const mongoose = require('mongoose');


let orderSchema = mongoose.Schema({
    userId: String,
    customerEmail: String,
    customerName: String,
    customerId: String,
    paymentIntentId: String,
    products: [],
    subtotal:String,
    total:String,
    payment_status:String,



},{timestamps:true});

module.exports = mongoose.model('order', orderSchema)