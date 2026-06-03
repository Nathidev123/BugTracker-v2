
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bugticketSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String, 
        required: true
    },
    status: {
        type: String,
        required: true
    },
    user_id: {
    //associating every ticket with a particular
    //user
    type: String,
    required: true
    }
    
},

{timestamps: true}
)

module.exports = mongoose.model('BugTicket', bugticketSchema)
//creating model to import from other files