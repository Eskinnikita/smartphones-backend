const mongoose = require('mongoose')

const vendorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
})

module.exports = mongoose.model('vendor', vendorSchema)