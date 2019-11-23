const express = require('express')
const mongoose = require("mongoose")

const logSchema = require('../models/log')

const logger = async (method, url, status, message, createdAt, userAgent, data) => {
    try {
        const log = new logSchema({
            method: method,
            url: url,
            status: status,
            message: message,
            createdAt: createdAt,
            userAgent: userAgent,
            data: data
        })
        console.log('log', log)
        await log.save()
    } catch (err) {
        console.log(err)
    }
}

module.exports = logger