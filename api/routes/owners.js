const express = require('express')
const mongoose = require("mongoose")
const request = require("request")
const Smartphone = require("../models/smartphone")
const router = express.Router()
const Owner = require('../models/owner')

router.get('/', async (req,res) => {
    try {
        const userInfo = {
            firstName: req.query.firstName,
            middleName: req.query.middleName,
            lastName: req.query.lastName,
            email: req.query.email
        }
        const smartphoneName = req.query.phoneName
        const person = {}

        request(`http://persons.std-247.ist.mospolytech.ru/person?firstName=${userInfo.firstName}&middleName=${userInfo.middleName}&lastName=${userInfo.lastName}&email=${userInfo.email}`,
            {json: true}, async (err, result, body) => {
                if (err) {
                    res.status(500).json('server error')
                } else {
                    console.log('RESULT', result)
                    if(result.body.data) {
                        console.log('BODY DATA', result.body.data)
                        request.post(`http://persons.std-247.ist.mospolytech.ru/person`, {form: userInfo}, async (err, httpResponse, body) => {
                            if (err) {
                                res.status(500).json('Cant add user in persons database')
                            } else {
                                const phone = await Smartphone.findOne({name: smartphoneName})
                                const addedPersonId = JSON.parse(httpResponse.body).data.id
                                const owner = new Owner({
                                    _id: new mongoose.Types.ObjectId(),
                                    owner_id: addedPersonId,
                                    smartphone_id: phone._id
                                })
                                const addedOwner = await owner.save()
                                res.status(201).json(addedOwner)
                            }
                        })
                    }
                    else {
                        const person = body
                        const result = await Owner.findOne({'owner_id': person.id}).populate('smartphone_id')
                        console.log(result)
                        const owner = {
                            _id: result._id,
                            owner: person,
                            smartphone: result.smartphone_id
                        }
                        res.status(200).json(owner)
                        // const foundOwner
                    }
                }
            })
    }
    catch(err){
        res.status(500).send({error: err.message})
    }
    // try {
    //     let reqData = {
    //         firstName: req.query.firstName,
    //         middleName: req.query.middleName,
    //         lastName: req.query.lastName,
    //         email: req.query.email
    //     }
    //     const person = {};
    //     request(`http://persons.std-247.ist.mospolytech.ru/person?firstName=${reqData.firstName}&middleName=${reqData.middleName}&lastName=${reqData.lastName}&email=${reqData.email}`,
    //         {json: true},(err, result, body) => {
    //         if(err) {
    //             res.status(500).json('server error')
    //         }
    //         else {
    //             const person = result.body
    //         }
    //     })
    //     const result = Owner.find({'owner_id': person.id})
    //     if(result.length === 0){
    //         request.post(`http://persons.std-247.ist.mospolytech.ru/person`, {form: reqData}, (err,httpResponse,body)=> {
    //             if(err) {
    //                 res.status(500).json('Error to add user in persons database')
    //             }
    //             else {
    //                 const addedPersonId = JSON.parse(httpResponse.body).data.id
    //                 const vendor = new Vendor({
    //                     _id: new mongoose.Types.ObjectId(),
    //                     owner_id: addedPersonId
    //                 })
    //             }
    //         })
    //         // res.status(400).json('Cant found owner in owners table')
    //     }
    //     else {
    //         res.status(200).json(result)
    //     }
    // } catch (err) {
    //     res.status(500).json({
    //         error: err
    //     })
    // }
})





module.exports = router