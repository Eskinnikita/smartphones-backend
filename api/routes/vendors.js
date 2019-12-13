const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Vendor = require('../models/vendor')

router.get('/', async (req, res) => {
  try {
    const result = await Vendor.find()
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
    const vendor = new Vendor({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      country: req.body.country
    })
    const addedVendor = await vendor.save()
    res.status(201).json(addedVendor)
  } catch (err) {
    console.log(err)
    res.status(500).send({
      error: err
    })
  }
})

router.get("/:vendorId", async (req, res) => {
  try {
    const id = req.params.vendorId;
    const vendor = await Vendor.findById(id)
    if (vendor) {
      res.status(200).json(vendor);
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

router.delete("/:vendorId", async (req, res) => {
  try {
    const id = req.params.vendorId;
    const deletedVendor = await Vendor.remove({
      _id: id
    })
    if (deletedVendor) {
      res.status(200).json(deletedVendor)
    } else {
      res.status(404).json({
        message: "No valid entry found for provided ID"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    })
  }
})

router.patch("/:vendorId", async (req, res) => {
  try {
    const id = req.params.vendorId;
    const updateOps = {};
    for (const ops of Object.keys(req.body)) {
      updateOps[ops] = req.body[ops];
    }
    const updatedVendor = await Vendor.update({
      _id: id
    }, {
      $set: updateOps
    })
    if (updatedVendor) {
      res.status(200).json(updatedVendor);
    } else {
      res.status(404).json({
        message: "No valid entry found for provided ID"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    })
  }
})

module.exports = router