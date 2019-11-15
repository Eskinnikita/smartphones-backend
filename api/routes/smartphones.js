const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

const Smartphone = require("../models/smartphone")

router.get("/", async (req, res) => {
  try {
    const result = await Smartphone.find()
    if (result.length > 0) {
      res.status(200).json(result)
    } else {
      res.status(404).json({
        message: 'No entries found'
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: err
    })
  }
})

router.post("/", async (req, res) => {
  try {
    const phone = new Smartphone({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price
    })
    const savedPhone = await phone.save()
    res.status(200).json(savedPhone)
  } catch (err) {
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
      res.status(200).json(phone);
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
    res.status(200).json(updatedPhone);
  } catch (err) {
    console.log(err);
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
    res.status(200).json(deletedPhone)
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    })
  }
})

module.exports = router;