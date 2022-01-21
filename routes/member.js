const express = require('express')
const mongoose = require('mongoose')
const Member = require("../models/Member")
const router = express.Router()


//@route Get /All
router.get("/", async (req, res) => {
    const members = await Member.find({});
    try {
        res.send(members);
    } catch (err) {
        res.status(500).send(err);
    }
});

//@route Get /id
router.get('/:id', async (req, res) => {
    try {
        const member = await Member.findOne({ _id: req.params.id });
        console.log(member);
        if (member) {
            res.send(member);
        }
        else {
            res.status(400).send(`Member Not found.`);
        }
    }
    catch (err) {
        console.log(`Error Occured while resolving member ${err}`)
    }
});

//@route Post /member
router.post('/', async (req, res) => {
    try {
        let member = await Member.findOne({ id: req.body.id });
        member = await Member.findOne({ name: req.body.name });
        if (member) {
            res.status(400).send(`Duplicate Member Entry. \n${member}`);
        }
        member = await Member.create({
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            designation: req.body.designation
        })
        res.send({ member });
    }
    catch (err) {
        console.log(`Error Occured while resolving member ${err}`)
    }
});


module.exports = router;