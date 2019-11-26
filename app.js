require('dotenv').config();
const express = require("express")
const app = express()
const morgan = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const logger = require('./api/middlewares/logger')
const smartphonesRoutes = require("./api/routes/smartphones")
const osRoutes = require("./api/routes/os")
const vendorsRoutes = require("./api/routes/vendors")

require('./api/db/db')

app.use(morgan("dev"))

app.use(logger)

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({})
  }
  next()
})

app.use("/smartphones", smartphonesRoutes)
app.use("/os", osRoutes)
app.use("/vendors", vendorsRoutes)


app.use((req, res, next) => {
  const error = new Error("Not found")
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app