
const express = require('express')

const {
    createTicket,
    getAllTickets,
    getTicket,
    deleteTicket,
    updateTicket
} = require('../controller/bugTrackController')

const router = express.Router()
//above creating a mini sub app that can hold routes

//models import
//moved to the controller
//const BugTicket = require('./models/BugTicketsModel')

//creating our routes
//this is our smoke test at this point
//testing the api if it will work and it does
//to get all the bugs
router.get('/', getAllTickets)
    //res.json({mssg: 'GET all bugs'})
//})

//to get a single bug
router.get('/:id', getTicket)


//post a bug
router.post('/', createTicket) 
/*router.post('/', async (req, res) => {
    //res.json({mssg:'Post a bug'})

//destructuring the schema elements to add to the body
//const {title, description, priority, status} = req.body

try{
    const bugticket = await BugTicket.create({title, description, 
                                              priority, status
    })
    res.status(200).json(bugticket)
}
catch(error){
    res.status(400).json({error: error.message})
}
//res.json({mssg: 'Post a new bugticket'})
})
*/


router.delete('/:id', deleteTicket)


router.patch('/:id', updateTicket)


module.exports = router