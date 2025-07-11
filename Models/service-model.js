const mongoose = require('mongoose')


const serviceSchema = mongoose.Schema({
    icon: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})

const Service = mongoose.model('services', serviceSchema)

module.exports = Service