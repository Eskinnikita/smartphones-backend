const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Os = require('../models/os')

router.get('/', async (req, res) => {
    try {
        const result = await Os.find()
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

router.post('/', async (req, res) => {
    try {
        const os = new Os({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            developers: req.body.developers
        })
        const addedOs = await os.save()
        res.status(200).json(addedOs)
    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: err
        })
    }
})

router.get("/:osId", async (req, res) => {
    try {
      const id = req.params.osId;
      const os = await Os.findById(id)
      if (os) {
        res.status(200).json(os);
      } else {
        res.status(404).json({
          message: "No valid entry found for provided ID"
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err
      });
    }
  })

module.exports = router