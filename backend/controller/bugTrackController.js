

const BugTicket = require('../models/BugTicketsModel')
//will be used to interact with database

//mongoose import
const mongoose = require('mongoose')

//get all tickets
const getAllTickets =  async (req, res) => {
    const bugticket = await BugTicket.find({}).sort({createdAt: -1})
    
    //{} all documents
    //-1 in descending order
    res.status(200).json(bugticket)
}


//get a single ticket
const getTicket = async (req, res) => {
    const { id } = req.params
    //so will find whatever is in search bar

    //checking if id is of mongoDB or mongoose criteria
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Ticket'})
    }
    const bugticket = await BugTicket.findById(id)

    if(!bugticket){
        res.status(400).json({error: 'No such Ticket'}) 
    }
    res.status(200).json(bugticket)
}


//Post ticket
const createTicket = async (req, res) => {
    //the destructuring moved from bugtrack.js
    const {title, description, priority, status} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(!priority){
        emptyFields.push('priority')
    }
    if(!status){
        emptyFields.push('status')
    }
    if(emptyFields.length > 0){
        //if length is greater than 0
        //it means that one or more of these
        //fields are empty
        return res.status(400).json({error: 'Please fill in all fields', emptyFields})
    }
    try{
    const bugticket = await BugTicket.create({title, description, 
                                              priority, status
    })
    res.status(200).json(bugticket)
}
catch(error){
    res.status(400).json({error: error.message})
}

}



//delete a ticket
const deleteTicket = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Ticket'})
    }
    const bugticket = await BugTicket.findOneAndDelete({_id: id})

    if(!bugticket){
        res.status(400).json({error: 'No such Ticket'}) 
    }
    res.status(200).json(bugticket)
}


//update/patch
const updateTicket = async (req, res) => {
    const { id } = req.params
    const {title, description, priority, status} = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Ticket'})
    }
    const bugticket = await BugTicket.findOneAndUpdate({_id: id}, {
        ...req.body//so whatever object is in the body, it will update
                    //those particular fields
    }, {returnDocument: 'after'}) //return updated doc

    if(!bugticket){
        res.status(400).json({error: 'No such Ticket'}) 
    }
    res.status(200).json(bugticket)
}


module.exports = {
    createTicket,
    getAllTickets,
    getTicket,
    deleteTicket,
    updateTicket
}