const mongoose = require('mongoose')

const osSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    developers: Array
})

module.exports = mongoose.model('Os', osSchema)