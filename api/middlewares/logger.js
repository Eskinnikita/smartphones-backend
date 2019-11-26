const express = require('express')
const mongoose = require("mongoose")

const logSchema = require('../models/log')

const logger = async (req, res, next) => {
    try {
        const oldWrite = res.write
        const oldEnd = res.end

        const chunks = []

        res.write = (...restArgs) => {
            chunks.push(Buffer.from(restArgs[0]))
            oldWrite.apply(res, restArgs)
        };

        res.end = async (...restArgs) => {
            if (restArgs[0]) {
                chunks.push(Buffer.from(restArgs[0]))
            }
            const body = Buffer.concat(chunks).toString('utf8')
            const log = new logSchema({
                method: req.method,
                uri: req.originalUrl,
                time: new Date().toUTCString(),
                sourceIP: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                userAgent: req.headers['user-agent'],
                requestData: req.body,
                responseData: body
            })
            await log.save()
            oldEnd.apply(res, restArgs)
        }
        next()
    }
    catch(err) {
        console.log(err)
        next()
    }
}

module.exports = logger