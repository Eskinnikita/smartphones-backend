const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Smartphone = require("../models/smartphone")

router.get("/", async (req, res, next) => {
  try {
    const result = await Smartphone.find()
    if(result.length >= 0) {
      res.status(200).json(result)
    }
    else {
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

router.post("/", (req, res, next) => {
  const phone = new Smartphone({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  })
  phone
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /smartphones",
        createdPhone: result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
})

router.get("/:phoneId", (req, res, next) => {
  const id = req.params.phoneId;
  Smartphone.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({
            message: "No valid entry found for provided ID"
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    })
})

router.patch("/:phoneId", (req, res, next) => {
  const id = req.params.phoneId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Smartphone.update({
      _id: id
    }, {
      $set: updateOps
    })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
})

router.delete("/:phoneId", (req, res, next) => {
  const id = req.params.phoneId;
  Smartphone.remove({
      _id: id
    })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
})

module.exports = router;