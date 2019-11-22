const mongoose = require('mongoose')

const osSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    developers: Array
})

module.exports = mongoose.model('os', osSchema)