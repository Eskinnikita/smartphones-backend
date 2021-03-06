const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()

const Smartphone = require("../models/smartphone")

router.get("/", async (req, res) => {
    try {
        const result = await Smartphone.find({})
            .populate('vendor', ['name', 'country'])
            .populate('os', ['name'])
        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                message: 'No entries found'
            })
        }
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
})

router.get("/search", async (req, res) => {
    try {
        let searchResult = await Smartphone.find()
            .populate('vendor')
            .populate('os')

        const query = req.query
        const queryKeys = Object.keys(query)

        if (searchResult.length !== 0) {
            searchResult = searchResult.filter(el => {
                if(queryKeys.length === 2) {
                    return el.vendor.country.indexOf(query.country) !== -1 && el.os.name.indexOf(query.os) !== -1;
                }
                else if (queryKeys[0] === 'os') {
                    return el.os.name.indexOf(query.os) !== -1
                }
                else if (queryKeys[0] === 'country') {
                    return el.vendor.country.indexOf(query.country) !== -1
                }
            })
            res.status(200).json(searchResult)
        } else {
            res.status(404).json('nothing found')
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

router.post("/", async (req, res) => {
    try {
        const phone = new Smartphone({
            _id: new mongoose.Types.ObjectId(),
            vendor: req.body.vendor_id,
            name: req.body.name,
            os: req.body.os_id,
            memory: req.body.memory,
            display_size: req.body.display_size,
            battery: req.body.battery,
            price: req.body.price
        })
        const savedPhone = await phone.save()
        res.status(201).json(savedPhone)
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
            .populate('vendor', ['name', 'country'])
            .populate('os', ['name'])
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
        if (updatedPhone) {
            res.status(200).json(updatedPhone);
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

router.delete("/:phoneId", async (req, res) => {
    try {
        const id = req.params.phoneId;
        //refactor to FindOneAndDelete
        const deletedPhone = await Smartphone.remove({
            _id: id
        })
        if (deletedPhone) {
            res.status(200).json(deletedPhone)
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


module.exports = router;