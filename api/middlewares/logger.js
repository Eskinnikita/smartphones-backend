const express = require('express')
const mongoose = require("mongoose")

const logger = async (req, res, next) => {
    try {
        const result = {
            request: req.url, 
            method: req.method, 
            status: res.statusCode, 
            createdAt: Date.now()
        }
        console.log(`result ${result}`)
        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

module.exports = logger