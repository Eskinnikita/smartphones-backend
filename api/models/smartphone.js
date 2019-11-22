const mongoose = require('mongoose');

const smartphoneSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    vendor_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    os_id: Number,
    memory: Number,
    display_size: Number,
    battery: Number,
    price: Number
});

module.exports = mongoose.model('Smartphone', smartphoneSchema);