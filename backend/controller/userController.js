
//importing userModel
const User = require('../models/userModel')
//after here can test in Postman
//localhost:900/api/user/login

const jwt = require('jsonwebtoken')
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)

        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch(error) {
        res.status(400).json({error: error.message})
    }
    res.json({mssg: 'login user'})
}

//signup user
const signupUser = async(req, res) => {
   // res.json({mssg: 'signup user'})
   //destructuring from an object 
   const { email, password } = req.body

   try{
    const user = await User.signup( email, password)
    const token = createToken(user._id)
    //this is going to be on the payload
    //of the token
    res.status(200).json({email, token})

   }
   catch(error){
    res.status(400).json({error: error.message})
   }
}

//exporting to user.js
module.exports = {loginUser,
                 signupUser,
                }


