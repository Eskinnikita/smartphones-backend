const mongoose = require('mongoose');

const smartphoneSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

module.exports = mongoose.model('Smartphone', smartphoneSchema);