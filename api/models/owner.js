const mongoose = require('mongoose')

const ownerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner_id: {
        type: Number,
        required: true
    },
    name: String,
    surname: String,
    phone_id: String
})

module.exports = mongoose.model('owner', ownerSchema)