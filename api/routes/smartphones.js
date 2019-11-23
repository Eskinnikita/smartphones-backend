const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const logger = require('../middlewares/logger')

const Smartphone = require("../models/smartphone")

router.get("/", async (req, res) => {
  try {
    const result = await Smartphone.find()
    if (result.length > 0) {
      logger(req.method, req.url, 200, 'OK', Date(Date.now()), req.get('User-Agent'), result)
      res.status(200).json(result)
    } else {
      logger(req.method, req.url, 404, 'No entries found', Date(Date.now()), req.get('User-Agent'), result)
      res.status(404).json({
        message: 'No entries found'
      })
    }
  } catch (err) {
    logger(req.method, req.url, 500, err, Date(Date.now()), req.get('User-Agent'))
    res.status(500).json({
      error: err
    })
  }
})

router.post("/", async (req, res) => {
  try {
    const phone = new Smartphone({
      _id: new mongoose.Types.ObjectId(),
      vendor_id: req.body.vendor_id,
      name: req.body.name,
      os_id: req.body.os_id,
      memory: req.body.memory,
      display_size: req.body.display_size,
      battery: req.body.battery,
      price: req.body.price
    })
    const savedPhone = await phone.save()
    logger(req.method, req.url, 200, 'OK', Date(Date.now()), req.get('User-Agent'), savedPhone)
    res.status(200).json(savedPhone)
  } catch (err) {
    logger(req.method, req.url, 500, err, Date(Date.now()), req.get('User-Agent'))
    res.status(500).json({
      error: err
    })
  }
})

router.get("/:phoneId", async (req, res) => {
  try {
    const id = req.params.phoneId;
    const phone = await Smartphone.findById(id)
    if (phone) {
      logger(req.method, req.url, 200, 'OK', Date(Date.now()), req.get('User-Agent'), phone)
      res.status(200).json(phone);
    } else {
      logger(req.method, req.url, 404, 'No valid entry found for provided ID', Date(Date.now()), req.get('User-Agent'))
      res.status(404).json({
        message: "No valid entry found for provided ID"
      });
    }
  } catch (err) {
    console.log(err);
    logger(req.method, req.url, 500, err, Date(Date.now()), req.get('User-Agent'))
    res.status(500).json({
      error: err
    });
  }
})

router.patch("/:phoneId", async (req, res) => {
  try {
    const id = req.params.phoneId;
    const updateOps = {};
    for (const ops of Object.keys(req.body)) {
      updateOps[ops] = req.body[ops];
    }
    const updatedPhone = await Smartphone.update({
      _id: id
    }, {
      $set: updateOps
    })
    if (updatedPhone) {
      logger(req.method, req.url, 200, 'OK', Date(Date.now()), req.get('User-Agent'), updatedPhone)
      res.status(200).json(updatedPhone);
    } else {
      logger(req.method, req.url, 404, 'No valid entry found for provided ID', Date(Date.now()), req.get('User-Agent'))
      res.status(404).json({
        message: "No valid entry found for provided ID"
      });
    }
  } catch (err) {
    console.log(err);
    logger(req.method, req.url, 500, err, Date(Date.now()), req.get('User-Agent'))
    res.status(500).json({
      error: err
    })
  }
})

router.delete("/:phoneId", async (req, res) => {
  try {
    const id = req.params.phoneId;
    const deletedPhone = await Smartphone.remove({
      _id: id
    })
    if(deletedPhone) {
      logger(req.method, req.url, 200, 'OK', Date(Date.now()), req.get('User-Agent'), deletedPhone)
      res.status(200).json(deletedPhone)
    }
    else {
      logger(req.method, req.url, 404, 'No valid entry found for provided ID', Date(Date.now()), req.get('User-Agent'))
      res.status(404).json({
        message: "No valid entry found for provided ID"
      });
    }
  } catch (err) {
    console.log(err);
    logger(req.method, req.url, 500, err, Date(Date.now()), req.get('User-Agent'))
    res.status(500).json({
      error: err
    })
  }
})

module.exports = router;