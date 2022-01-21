const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    designation: {
        type: String,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Member', memberSchema);