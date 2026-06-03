
const express = require('express')

const {
    createTicket,
    getAllTickets,
    getTicket,
    deleteTicket,
    updateTicket
} = require('../controller/bugTrackController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()


//above creating a mini sub app that can hold routes

//models import
//moved to the controller
//const BugTicket = require('./models/BugTicketsModel')

//creating our routes
//this is our smoke test at this point
//testing the api if it will work and it does
//to get all the bugs

//require Auth for all bug routes
router.use(requireAuth)

router.get('/', getAllTickets)
    //res.json({mssg: 'GET all bugs'})
//})

//to get a single bug
router.get('/:id', getTicket)


//post a bug
router.post('/', createTicket) 



router.delete('/:id', deleteTicket)


router.patch('/:id', updateTicket)


module.exports = router