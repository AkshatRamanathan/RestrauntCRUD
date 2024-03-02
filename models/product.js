const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    spiciness: {
        type: Number,
        required: false
    }

});

module.exports = mongoose.model('Product', productSchema);
