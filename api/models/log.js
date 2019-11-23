const mongoose = require('mongoose')

const logSchema = mongoose.Schema({
    method: String,
    url: String,
    status: Number,
    message: String,
    createdAt: Date,
    userAgent: String,
    data: Array
})

module.exports = mongoose.model('log', logSchema)