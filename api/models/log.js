const mongoose = require('mongoose')

const logSchema = mongoose.Schema({
    method: String,
    uri: String,
    time: String,
    sourceIP: String,
    userAgent: String,
    requestData: Array,
    responseData: Array
})

module.exports = mongoose.model('log', logSchema)