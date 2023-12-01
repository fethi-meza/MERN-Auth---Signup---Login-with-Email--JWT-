const Userout = require('express').Router()
const bcrypt =require('bcrypt')
const  {User ,validateRegsetrUser} = require('../models/user')

Userout.post('/',async(req,res)=>{

    try {
        
const {error} = validateRegsetrUser(req.body)
if (error) {
    return res.status(400).json({success : false , message :error.details[0].message})
}

const user = await User.findOne({email: req.body.email})

if (user) {
    return res.status(409).json({message : 'this user already exsit'})
}

//hasch pasword
const salt = await bcrypt.genSalt(10)
const hachPassword = await bcrypt.hash(req.body.password ,salt)

//save in db
await new User({...req.body ,password :hachPassword}).save();
res.status(201).json({success : true , message :'successfuly user is'})


    } catch (error) {
        res.status(500).json({success : false , message :'somthing went wrong in server'})
    }

})


module.exports =Userout