const mongoose = require('mongoose')

const vendorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    country: String
})

module.exports = mongoose.model('Vendor', vendorSchema)