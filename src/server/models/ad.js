const mongoose = require('mongoose');



let adSchema = mongoose.Schema({
    title: String,
    price: String,
    brand: String,
    description: String,
    imagePath: String,
    soldQty: { type: Number, default: 0 }

});

module.exports = mongoose.model('ad', adSchema);