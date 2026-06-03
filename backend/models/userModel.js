
const mongoose = require('mongoose')


const bcrypt = require('bcrypt')

const validator = require('validator')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//static method signup
//instead of writing it in singupUser in controller
userSchema.statics.signup = async function ( email, password ){

    //validation
    if(!email || !password){
        throw Error('All fileds must be filled')
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }
     const exists = await this.findOne({ email })
     if(exists) {
        throw Error('Email already in use')
     }

     const salt = await bcrypt.genSalt(10)
     const hash = await bcrypt.hash(password, salt)

     //to store this password alongside user email in db
     const user = await this.create({ email, password: hash })
     return user
}


    userSchema.statics.login = async function( email, password ){
        if(!email || !password){
        throw Error('All fileds must be filled')
    }
    const user = await this.findOne({ email })
    if(!user){
        throw Error('Incorrect Email')
    }
    //checking if passwords match
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Incorrect Password')
    }
    return user
    }

module.exports = mongoose.model('User', userSchema)