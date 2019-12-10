const mongoose = require('mongoose');

const smartphoneSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    os: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Os'
    },
    memory: Number,
    display_size: Number,
    battery: Number,
    price: Number
});

module.exports = mongoose.model('Smartphone', smartphoneSchema);