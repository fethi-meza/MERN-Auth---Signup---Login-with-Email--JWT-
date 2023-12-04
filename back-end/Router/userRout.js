const Userout = require('express').Router()
const bcrypt =require('bcrypt')
const  {User ,validateRegsetrUser} = require('../models/user')
const Token = require("../models/token")
const SendEmail = require('../utils/sendEmail')
const crypto = require('crypto')


Userout.post('/',async(req,res)=>{

    try {
        
const {error} = validateRegsetrUser(req.body)
if (error) {
    return res.status(400).json({success : false , message :error.details[0].message})
}

let user = await User.findOne({email: req.body.email})

if (user) {
    return res.status(409).json({message : 'this user already exsit'})
}

//hasch pasword
const salt = await bcrypt.genSalt(10)
const hachPassword = await bcrypt.hash(req.body.password ,salt)

//save in db
user = await new User({...req.body ,password :hachPassword}).save();

const token = await new Token({
    userId :user._id ,
    token :crypto.randomBytes(32).toString("hex")
}).save()
const url =`${process.env.BASID_URL}/users/${user.id}/verify/${token.token}`;
await SendEmail(user.email ,"verify Email",url);
res.status(201).json({success : true , message :'An email send it to you'})


    } catch (error) {
        res.status(500).json({success : false , message :'somthing went wrong in server'})
    }

})


module.exports =Userout