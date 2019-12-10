const mongoose = require('mongoose')

const ownerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner_id: {
        type: Number,
        required: true
    },
    smartphone_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Smartphone',
        required: true
    }
})

module.exports = mongoose.model('Owner', ownerSchema)