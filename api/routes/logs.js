const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Log = require('../models/log')

router.get('/', async (req, res) => {
    try {
      const result = await Log.find()
      if (result.length > 0) {
        res.status(200).json(result)
      } else {
        res.status(404).json({
          message: 'Nothing found'
        })
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    }
  })

module.exports = router